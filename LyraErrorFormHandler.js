
"use strict";
var lyraErrorFormHandler = function () {
  this.defaultError   = "DEFINE CUSTOM MESSAGE";
  this.errorACQ       = "DEFINE CUSTOM MESSAGE";
  this.erorrAUTH      = "DEFINE CUSTOM MESSAGE";
  this.erorrINT       = "DEFINE CUSTOM MESSAGE";
  this.erorrINT_041   = "DEFINE CUSTOM MESSAGE";
  this.errorPSP       = "DEFINE CUSTOM MESSAGE";
  this.errorPSP_526   = "DEFINE CUSTOM MESSAGE";
  this.errorPSP_108   = "DEFINE CUSTOM MESSAGE";
  this.errorPSP_508   = "DEFINE CUSTOM MESSAGE";
  this.errorPSP_509   = "DEFINE CUSTOM MESSAGE";
  this.errorCLIENT_004 = "DEFINE CUSTOM MESSAGE";
  this.error300       = "DEFINE CUSTOM MESSAGE";
  this.error301       = "DEFINE CUSTOM MESSAGE";
  this.error302       = "DEFINE CUSTOM MESSAGE";
  this.error303       = "DEFINE CUSTOM MESSAGE";

  /**
   * 
   * @param {object} event
   * @param {object| null} ctaBtnId
   * @param {string} formContainer
   */

  this.errorMessageHandler = (event, formContainer, ctaBtnId = null) => {
    if (typeof event === null) {
      return;
    }
    let self = this;
    if (ctaBtnId !== null) ctaBtnId.classList.remove("is-loading");

    switch (event.errorCode) {
      // PSP ERRORS
      case "PSP_023":
      case "PSP_024":
      case "PSP_026":
      case "PSP_508":
      case "PSP_509":
      case "PSP_526":
      case "PSP_527":
      case "PSP_528":
      case "PSP_529":
      case "PSP_530":
      case "PSP_531":
      case "PSP_532":
      case "PSP_533":

        self.errorMessageRenderer(formContainer, this.errorPSP_526);
        break;

      case "PSP_108":
        self.errorMessageRenderer(formContainer, this.errorPSP_108);
        break;

      case this.checkLyraRestError(event.errorCode, "psp"):
        self.errorMessageRenderer(formContainer, this.errorPSP);
        break;

        // INT ERRORS

      case "INT_041":
      case "INT_042":
      case "INT_043":
      case "INT_855":
        self.errorMessageRenderer(formContainer, this.erorrINT_041);
        break;

      case this.checkLyraRestError(event.errorCode, "int"):
        self.errorMessageRenderer(formContainer, this.erorrINT);
        break;

      case this.checkLyraRestError(event.errorCode, "auth"):
        self.errorMessageRenderer(formContainer, this.erorrAUTH);
        break;

      case this.checkLyraRestError(event.errorCode, "acq"):
        self.errorMessageRenderer(formContainer, this.errorACQ);
        break;

      case "CLIENT_004":
      case "CLIENT_100":
      case "CLIENT_101":
      case "CLIENT_304":
      case "CLIENT_500":
      case "CLIENT_501":
      case "CLIENT_502":
      case "CLIENT_997":
      case "CLIENT_998":
      case "CLIENT_999":
      case "CLIENT_704":
        self.errorMessageRenderer(formContainer, this.errorCLIENT_004);
        break;

      case "CLIENT_300":
        self.errorMessageRenderer(formContainer, self.error300);
        // gerer les meesages des child
        if (event.children && event.children.length > 0)
          event.children.forEach((item) => {
            if (item.errorCode === "CLIENT_301")
              document.querySelector(".kr-pan").classList.add("has-error");
            if (item.errorCode === "CLIENT_302")
              document.querySelector(".kr-expiry").classList.add("has-error");
            if (item.errorCode === "CLIENT_303")
              document
                .querySelector(".kr-security-code")
                .classList.add("has-error");
          });
        break;

      case "CLIENT_301":
        self.errorMessageRenderer(".kr-pan", self.error301);
        break;

      case "CLIENT_302":
        self.errorMessageRenderer(".kr-expiry", self.error302);
        break;

      case "CLIENT_303":
        self.errorMessageRenderer(".kr-security-code", self.error303);
        break;
      default: self.errorMessageRenderer(formContainer, self.defaultError);

    }
  };
  /**
   * Generate html error element
   *
   * @param {Element} parent
   * @param {String} message
   */

  this.errorMessageRenderer = (parent, message) => {
    const parentElement = document.querySelector(parent);
    if (typeof parentElement === null) return;
    if (message !== null) {
      //  delete older messages
      document
        .querySelectorAll(".kr-custom-error")
        .forEach((item) => item.remove());
      document
        .querySelectorAll(".has-error")
        .forEach((item) => item.classList.remove("has-error"));
      
        const node = document.createElement("span");
      node.classList.add("kr-custom-error");
      const textnode = document.createTextNode(message); // Create a text node
      node.appendChild(textnode);
      parentElement.appendChild(node); // Append <li> to <ul> with id="myList"
    }
    parentElement.classList.add("has-error");
  };
  /**
   * 
   * @param errorCode : le code erreur ACQ_001 , AUTH_149 ...
   * @param errorCondition : le code erreur acq , auth ...
   */
  this.checkLyraRestError = (errorCode, errorCondition) => {
    if (errorCode.toLowerCase().indexOf(errorCondition) > -1) return errorCode; // pour valider le "case 'ACQ_001' par exmaple"
    return null;
  };
};
