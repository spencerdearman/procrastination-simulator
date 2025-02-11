import React, { createContext, useState } from "react";
import GameManager from "../classes/GameManager";
import Day from "../classes/Day";
import Task from "../classes/Task";
import Time from "../classes/Time";
import Attributes from "../classes/Attributes";
import Player from "../classes/Player";


export const GameContext = createContext();

//Need to make a GameProvider