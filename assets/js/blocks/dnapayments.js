(()=>{"use strict";const e=window.React,t=window.wc.wcBlocksRegistry,n=window.wp.i18n,a=window.wp.data,s=window.wp.element,o=window.wc.wcSettings,c=window.wp.htmlEntities,r="dnapayments",d="woocommerce-gateway-dna",l={number:`wc-${r}-card-number-hosted`,name:`wc-${r}-card-name-hosted`,expDate:`wc-${r}-expiry-hosted`,cvv:`wc-${r}-csc-hosted`,cvvToken:`wc-${r}-csc-token-hosted`,threeDS:"three-d-secure"},i=window.wc.blocksCheckout,m=()=>{const e=(0,o.getPaymentMethodData)(r,{});return{isTestMode:e.is_test_mode,integrationType:e.integration_type,tempToken:e.temp_token,terminalId:e.terminal_id,allowSavingCards:e.allow_saving_cards,cards:e.cards}};function p(...e){console.error(...e)}function u(e){const t=document.querySelector("button.wc-block-components-checkout-place-order-button");t&&(e?t.setAttribute("disabled","disabled"):t.removeAttribute("disabled"))}const y=({props:t,isLoaded:a=!1,hostedFieldsInstance:o=null,onLoad:c=(()=>{})})=>{const{components:{LoadingMask:r},token:y=null}=t,w=(0,s.useRef)(!1),h=(0,s.useRef)(),[v,g]=(0,s.useState)(!1),[E,b]=(0,s.useState)({name:"",number:"",expirationDate:"",cvv:""});return(0,s.useEffect)((()=>{const{cards:e}=m();if(y&&o){const t=e.find((e=>String(e.id)===String(y)));if(t){const e=o.getTokenizedCardCvvState(t);g("required"===e),o.selectCard(t)}}}),[y]),(0,s.useEffect)((()=>(w.current=!0,setTimeout((()=>{w.current&&(async()=>{const{isTestMode:e,tempToken:t,cards:n}=m(),a=n.find((e=>String(e.id)===String(y)));if(u(!0),h.current=function(e){const t=document.createElement("div");t.className="dna-modal-container",t.id=e;const n=document.createElement("div");n.className="dna-modal";const a=document.createElement("div");return a.className="dna-modal-body",n.appendChild(a),t.appendChild(n),document.body.appendChild(t),{show:()=>t.classList.add("open"),hide:()=>t.classList.remove("open"),remove:()=>t.remove(),body:a}}(l.threeDS),o=await async function({isTest:e,accessToken:t,threeDSModal:n,domElements:{number:a,name:s,expDate:o,cvv:c,cvvToken:r}}){const d={cardholderName:{container:s,placeholder:"ABC"},cardNumber:{container:a,placeholder:"1234 1234 1234 1234"},expirationDate:{container:o,placeholder:"MM / YY"},cvv:{container:c,placeholder:"CVC"},tokenizedCardCvv:{container:r,placeholder:"CVC"}},l={isTest:e,accessToken:t,styles:{input:{"font-size":"14px","font-family":"Open Sans"},"::placeholder":{opacity:"0"},"input:focus::placeholder":{opacity:"0.5"}},styleConfig:{containerClasses:{FOCUSED:"focused",INVALID:"has-error"}},fontNames:["Open Sans"],threeDSecure:{container:n.body},fields:d};try{const e=await window.dnaPayments.hostedFields.create(l);return e.on("blur",(function({fieldKey:e,fieldsState:t}){const n=d[e]?.container,a=t[e]?.isEmpty;n&&n.classList.toggle("empty",a)})),e.on("dna-payments-three-d-secure-show",(e=>{n&&n.show()})),e.on("dna-payments-three-d-secure-hide",(()=>{n&&n.hide()})),e}catch(e){throw p(e),new Error("Your card has not been authorised, please check the details and retry or contact your bank.")}}({isTest:e,accessToken:t,threeDSModal:h.current,domElements:{number:document.getElementById(l.number),name:document.getElementById(l.name),expDate:document.getElementById(l.expDate),cvv:document.getElementById(l.cvv),cvvToken:document.getElementById(l.cvvToken)}}),a){const e=o.getTokenizedCardCvvState(a);g("required"===e),o.selectCard(a)}u(!1),c(o)})()}),100),()=>{w.current=!1,o&&o.destroy(),h.current&&(h.current.remove(),h.current=null),c(null)})),[]),(0,e.createElement)(r,{isLoading:!a,showSpinner:!0},(0,e.createElement)("div",{className:"wc-block-dnapayments-card-elements",style:{display:y?"none":"flex"}},(0,e.createElement)("div",{className:"wc-block-gateway-container"},(0,e.createElement)("div",{id:l.number,className:"wc-block-gateway-input empty"}),(0,e.createElement)("label",{htmlFor:l.number},(0,n.__)("Card number",d)),(0,e.createElement)(i.ValidationInputError,{errorMessage:E.number})),(0,e.createElement)("div",{className:"wc-block-gateway-container"},(0,e.createElement)("div",{id:l.name,className:"wc-block-gateway-input empty"}),(0,e.createElement)("label",{htmlFor:l.name},(0,n.__)("Cardholder name",d)),(0,e.createElement)(i.ValidationInputError,{errorMessage:E.name})),(0,e.createElement)("div",{className:"wc-block-gateway-container wc-block-dnapayments-card-element-small"},(0,e.createElement)("div",{id:l.expDate,className:"wc-block-gateway-input empty"}),(0,e.createElement)("label",{htmlFor:l.expDate},(0,n.__)("Expiry date (MMYY)",d)),(0,e.createElement)(i.ValidationInputError,{errorMessage:E.expirationDate})),(0,e.createElement)("div",{className:"wc-block-gateway-container wc-block-dnapayments-card-element-small"},(0,e.createElement)("div",{id:l.cvv,className:"wc-block-gateway-input empty"}),(0,e.createElement)("label",{htmlFor:l.cvv},(0,n.__)("Card code (CVC)",d)),(0,e.createElement)(i.ValidationInputError,{errorMessage:E.cvv}))),(0,e.createElement)("div",{className:"wc-block-dnapayments-card-elements",style:{display:v?"flex":"none"}},(0,e.createElement)("div",{className:"wc-block-gateway-container wc-block-dnapayments-card-element-small"},(0,e.createElement)("div",{id:l.cvvToken,className:"wc-block-gateway-input empty"}),(0,e.createElement)("label",{htmlFor:l.cvvToken},(0,n.__)("Card code (CVC)",d)),(0,e.createElement)(i.ValidationInputError,{errorMessage:E.cvv}))))},w=e=>{try{return JSON.parse(e)}catch(e){return p(e),null}};var h;const v=(0,o.getPaymentMethodData)(r,{}),g="hosted-fields"===v.integration_type,E=(0,n.__)("DNA Payments",d),b=(0,c.decodeEntities)(v?.title||"")||E,C=t=>{const[o,r]=(0,s.useState)(!1),[l,i]=(0,s.useState)(null);return(({props:e,hostedFieldsInstance:t})=>{const{emitResponse:a,eventRegistration:{onCheckoutSuccess:o},shouldSavePayment:c}=e,{isTestMode:r,integrationType:l,allowSavingCards:i,cards:u}=m();(0,s.useEffect)((()=>o((({processingResponse:{paymentDetails:e}})=>new Promise((s=>{const o=w(e.paymentData),m=w(e.auth),y=w(o.merchantCustomData)||{},{returnUrl:h}=o.paymentSettings;switch(l){case"hosted-fields":window.DNAPayments.configure({isTestMode:r,cards:u,allowSavingCards:i}),t.submit({paymentData:{...o,merchantCustomData:JSON.stringify({...y,storeCardOnFile:c})},token:m.access_token}).then((()=>{s({type:a.responseTypes.SUCCESS,messageContext:a.noticeContexts.PAYMENTS}),window.location.href=h})).catch((e=>{p(e);let o=e.message;"INVALID_CARD_DATA"!==e.code&&(t.clear(),o=(0,n.__)("Your card has not been authorised, please check the details and retry or contact your bank.",d)),s({type:a.responseTypes.ERROR,message:o,messageContext:a.noticeContexts.PAYMENTS})}));break;case"embedded":window.DNAPayments.configure({isTestMode:r,cards:u,allowSavingCards:i,events:{cancelled:()=>s({type:a.responseTypes.ERROR,message:(0,n.__)("You have cancelled the payment process. Please try again if you wish to complete the order.",d),messageContext:a.noticeContexts.PAYMENTS}),paid:()=>s({type:a.responseTypes.SUCCESS,messageContext:a.noticeContexts.PAYMENTS}),declined:()=>s({type:a.responseTypes.ERROR,message:(0,n.__)("Your payment proccess has been failed.",d),messageContext:a.noticeContexts.PAYMENTS})}}),window.DNAPayments.openPaymentIframeWidget({...o,auth:m});break;default:window.DNAPayments.configure({isTestMode:r,cards:u,allowSavingCards:i}),window.DNAPayments.openPaymentPage({...o,auth:m})}}))))),[o,t])})({props:t,hostedFieldsInstance:l}),(0,a.select)("core/editor")?null:g?(0,e.createElement)(y,{props:t,isLoaded:o,hostedFieldsInstance:l,onLoad:e=>{i(e),r(!0)}}):(0,e.createElement)(s.RawHTML,null,(0,c.decodeEntities)(v.description||""))},k={name:r,label:(0,e.createElement)((t=>{const{PaymentMethodLabel:n}=t.components;return(0,e.createElement)(n,{text:b})}),null),content:(0,e.createElement)(C,null),edit:(0,e.createElement)(C,null),canMakePayment:()=>!0,savedTokenComponent:(0,e.createElement)(C,null),ariaLabel:b,supports:{showSavedCards:g,showSaveOption:g,features:null!==(h=v?.supports)&&void 0!==h?h:[]},placeOrderButtonLabel:(0,n.__)("Pay with DNA Payments",d)};(0,t.registerPaymentMethod)(k)})();