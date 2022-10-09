import {Greeter} from "./interfaces";
import {getGreeter} from './greeter'

export class LightDM {
  private greeter: Greeter;

  private constructor(greeter: Greeter) {
    this.greeter = greeter
  }

  static create(){
    return new LightDM(getGreeter())
  }

  get greeterInstance(){
    return this.greeter
  }
} 
