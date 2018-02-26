import { describe, beforeEach, it } from "mocha";
import{ assert } from "chai";
import { Model } from "./../../../src/models/model.model";
import {window} from "./../../window";

// Description du sujet de test
describe("Model", () => {

    let model;

     // Avant chaque it le beforeEach sera invoqué
     beforeEach(() =>{
         model = new Model({
             exist: undefined
         });
     }); 

     it("getObservers return an Array", () => {
        assert.isArray(model.getObservers());
     });

     //Description du test unitaire
     it("setter do not mute model property if not exists", () => {
        let value = true;
        model.set ("foo", value);      
        assert.equal(model.get("foo"), undefined);

     });

     it("setter mute model property if exists", () => {
        let value = true;
        model.set ("exist", value);      
        assert.equal(model.get("exist"), value);

     });
    
     it("Getter retrieve default value if property is undefined", () => {
         let value = "Default value";
         assert.equal(model.get("exist",value), value);
     }); 
    
     it("Getter retrieve default value if do not exists", () => {
        let value = "Default value";
        assert.equal(model.get("foo",value), value);
    }); 

    //the window problem (window. permet de faire les test sinon inutile)
    it("toString get JSON representation of model property", () => {
        assert.equal(model.toString(),"{}");
    }); 

    it("toString get JSON representation of muted model property", () => {
        model.set("exist",true);
        model.set(model.toString(), "{\"exist\":true}")
    }); 

    it("callback ", () => {
        let value = true;
        model.set("exist", value).bind;
        assert.equal(model.get("notification",value).bind);
    }); 

    it("notify call binded callback", () => {
        // class child instance model... pour tester les notify child
        let called = false;
        let callback = () => {
            called = true;
        }
        model.bind(callback);
        model.notify();
        assert.equal(called,true);
    }); 





});