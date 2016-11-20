/**
 * Copyright (c) 2015 Andrea Tino
 * File: lineDiagramVolumeVisualizer.ts
 */

/// <reference path="../vendor/d3.d.ts"/>

/// <reference path="../volumeStream.ts"/>
/// <reference path="./volumeVisualizer.ts"/>
/// <reference path="./cssStyle.ts"/>

namespace EVT {
	/**
	 * Class for static visualization.
	 */
	export class LineDiagramVolumeVisualizer implements VolumeVisualizer {
		private readonly css: [CssStyle] = [
			{
				selector: ["svg"],
				rules: [
					{ name: "font", value: "10px sans-serif" }
				]
			},
			{
				selector: [".axis", "path"],
				rules: [
					{ name: "display", value: "none" }
				]
			},
			{
				selector: [".axis", "line"],
				rules: [
					{ name: "fill", value: "none" },
					{ name: "stroke", value: "#000" },
					{ name: "shape-rendering", value: "crispEdges" }
				]
			},
			{
				selector: [".station", "line"],
				rules: [
					{ name: "stroke", value: "#ddd" },
					{ name: "stroke-dasharray", value: "1,1" },
					{ name: "shape-rendering", value: "crispEdges" }
				]
			},
			{
				selector: [".station", "text"],
				rules: [
					{ name: "text-anchor", value: "end" }
				]
			},
			{
				selector: [".train", "line"],
				rules: [
					{ name: "stroke-width", value: "1.5px" }
				]
			},
			{
				selector: [".train", "circle"],
				rules: [
					{ name: "fill", value: "#777" },
					{ name: "stroke", value: "#fff" },
					{ name: "stroke-width", value: "1.5px" }
				]
			}
		];

		private readonly formatTime = d3.time.format("%I:%M%p");

		private stations;

		/**
		 * The element where to render the stream.
		 * 
		 * @type {HTMLElement}
		 * @memberOf StaticVolumeVisualizer
		 */
		public host: HTMLElement;

		/**
		 * Pushes a new volume stream to be blended with existing one.
		 * 
		 * @param {VolumeStream} volume
		 * @memberOf StaticVolumeVisualizer
		 */
		public push(volume: VolumeStream) {

		}

		/**
		 * Renders the stream in the element.
		 * 
		 * @memberOf StaticVolumeVisualizer
		 */
		public render() {
			this.stations = []; // lazily loaded

			var margin = { top: 20, right: 30, bottom: 20, left: 100 };
			var width = 960 - margin.left - margin.right;
			var height = 500 - margin.top - margin.bottom;

			var x = d3.time.scale()
				.domain([this.parseTime("5:30AM"), this.parseTime("11:30AM")])
				.range([0, width]);

			var y = d3.scale.linear()
				.range([0, height]);

			var z = d3.scale.linear()
				.domain([.0001, .0003])
				.range(["purple", "orange"])
				.interpolate(d3.interpolateLab);

			var xAxis = d3.svg.axis()
				.scale(x)
				.ticks(8)
				.tickFormat(this.formatTime);

			var svg = d3.select("body").append("svg")
				.attr("width", width + margin.left + margin.right)
				.attr("height", height + margin.top + margin.bottom)
				.append("g")
				.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

			svg.append("defs").append("clipPath")
				.attr("id", "clip")
				.append("rect")
				.attr("y", -margin.top)
				.attr("width", width)
				.attr("height", height + margin.top + margin.bottom);

			d3.tsv("schedule.tsv", this.type, function (error, trains) {
				y.domain(d3.extent(this.stations, function (d: DiagramNode) { return d.distance; }));

				var station = svg.append("g")
					.attr("class", "station")
					.selectAll("g")
					.data(this.stations)
					.enter().append("g")
					.attr("transform", function (d: DiagramNode) { return "translate(0," + y(d.distance) + ")"; });

				station.append("text")
					.attr("x", -6)
					.attr("dy", ".35em")
					.text(function (d: DiagramNode) { return d.name; });

				station.append("line")
					.attr("x2", width);

				svg.append("g")
					.attr("class", "x top axis")
					.call(xAxis.orient("top"));

				svg.append("g")
					.attr("class", "x bottom axis")
					.attr("transform", "translate(0," + height + ")")
					.call(xAxis.orient("bottom"));

				var train = svg.append("g")
					.attr("class", "train")
					.attr("clip-path", "url(#clip)")
					.selectAll("g")
					.data(trains.filter(function (d) { return /[NLB]/.test(d.type); }))
					.enter().append("g")
					.attr("class", function (d: DiagramNode) { return d.type; });

				train.selectAll("line")
					.data(function (d) { return d.stops.slice(1).map(function (b, i) { return [d.stops[i], b]; }); })
					.enter().append("line")
					.attr("x1", function (d) { return x(d[0].time); })
					.attr("x2", function (d) { return x(d[1].time); })
					.attr("y1", function (d) { return y(d[0].station.distance); })
					.attr("y2", function (d) { return y(d[1].station.distance); })
					.style("stroke", function (d) { return z(Math.abs((d[1].station.distance - d[0].station.distance) / (d[1].time - d[0].time))); });

				train.selectAll("circle")
					.data(function (d) { return d.stops; })
					.enter().append("circle")
					.attr("transform", function (d) { return "translate(" + x(d.time) + "," + y(d.station.distance) + ")"; })
					.attr("r", 2);
			});
		}

		private type(d, i) {
			// Extract the stations from the "stop|*" columns.
			if (!i) for (var k in d) {
				if (/^stop\|/.test(k)) {
					var p = k.split("|");
					this.stations.push({
						key: k,
						name: p[1],
						distance: +p[2],
						zone: +p[3]
					});
				}
			}

			return {
				number: d.number,
				type: d.type,
				direction: d.direction,
				stops: this.stations
					.map(function (s) { return { station: s, time: this.parseTime(d[s.key]) }; })
					.filter(function (s) { return s.time != null; })
			};
		}

		private parseTime(s) {
			var t = this.formatTime.parse(s);
			if (t != null && t.getHours() < 3) t.setDate(t.getDate() + 1);
			return t;
		}
	}

	/**
	 * Data type passed to d3.
	 * 
	 * @interface DiagramNode
	 */
	interface DiagramNode {
		name: string;
		distance: number;
		type: any;
		time: any;
	}
}
