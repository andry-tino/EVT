/**
 * Copyright (c) 2015 Andrea Tino
 * File: window.ts
 */

import evt = require('./evt');

import Evt = evt.EVT.Evt;

(<any>window)['Evt'] = Evt;
