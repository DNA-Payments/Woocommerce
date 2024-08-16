(()=>{"use strict";const e=window.React,t=window.wc.wcBlocksRegistry,n=window.wp.i18n,a=window.wc.wcSettings,o=window.wp.htmlEntities,s=window.wp.element,r="dnapayments_apple_pay",c="woocommerce-gateway-dna",i=({messages:t=[]})=>t.map(((t,n)=>(0,e.createElement)("div",{className:"wc-block-components-notice-banner is-error",key:n},t))),d=window.wp.data;function l(e,{billing:t}){return e/10**t.currency.minorUnit}function m(e){return{firstName:e.first_name,lastName:e.last_name,addressLine1:e.address_1,addressLine2:e.address_2,city:e.city,postalCode:e.postcode,phone:e.phone,country:e.country}}function p(){const{CHECKOUT_STORE_KEY:e}=window.wc.wcBlocksData;return(0,d.select)(e).getOrderId()}async function u(e){const t=function(e){const{billing:t,shippingData:n}=e,{terminalId:o}=(()=>{const e=(0,a.getPaymentMethodData)("dnapayments",{});return{isTestMode:e.is_test_mode,integrationType:e.integration_type,tempToken:e.temp_token,terminalId:e.terminal_id,allowSavingCards:e.allow_saving_cards,cards:e.cards}})();return{invoiceId:p(),amount:l(t.cartTotal.value,e),customerDetails:{email:t.billingAddress.email,accountDetails:{accountId:t.customerId?String(t.customerId):void 0},billingAddress:m(t.billingAddress),deliveryDetails:{deliveryAddress:m(n.shippingAddress)}},paymentSettings:{terminalId:o}}}(e),n=new FormData;n.append("order_id",t.invoiceId),n.append("total",t.amount);const o=await fetch("/wp-admin/admin-ajax.php?action=get_payment_and_auth_data",{method:"POST",body:n}),s=await o.json();return{auth:s.auth,paymentData:{...s.paymentData,...t,invoiceId:s.paymentData.invoiceId,paymentSettings:s.paymentData.paymentSettings}}}function y(e){const t=w();t&&(e?t.setAttribute("disabled","disabled"):t.removeAttribute("disabled"))}function w(){return document.querySelector("button.wc-block-components-checkout-place-order-button")}const g=({containerId:t,componentInstance:a,gatewayId:o,errorMessage:r,props:d})=>{const{components:{LoadingMask:l}}=d,[m,p]=(0,s.useState)("idle"),[g,_]=(0,s.useState)([]),b=(0,s.useRef)(),f=(0,s.useRef)(),{emitResponse:E,eventRegistration:{onPaymentSetup:h}}=d;return(0,s.useEffect)((()=>h((async()=>f.current?.success?{type:E.responseTypes.SUCCESS,meta:{paymentMethodData:{[`wc-${o}-result`]:JSON.stringify(f.current)}}}:{type:E.responseTypes.ERROR,message:(0,n.__)("Your payment proccess has been failed.",c),messageContext:E.noticeContexts.PAYMENTS}))),[h,E]),(0,s.useEffect)((()=>{b.current&&a&&(async()=>{p("loading");const{paymentData:e,auth:t}=await u(d);f.current=null,a.create(b.current,e,{onClick:()=>{p("loading")},onPaymentSuccess:e=>{p("done"),function(...e){console.log(...e)}("onPaymentSuccess",e),f.current=e,function(){const e=w();e&&(e.removeAttribute("disabled"),e.click())}()},onCancel:()=>{p("done")},onError:e=>{!function(...e){console.error(...e)}("onError",e);let t=e.message||(0,n.__)("Your card has not been authorised, please check the details and retry or contact your bank.",c);!r||1002!==e.code&&1003!==e.code||(t=r),p("failed"),_([t])},onLoad:()=>{p("done")}},t.access_token)})()}),[a,b,d.billing.cartTotal.value]),(0,s.useEffect)((()=>(y(!0),()=>y(!1))),[]),(0,e.createElement)(e.Fragment,null,(0,e.createElement)(i,{messages:g}),(0,e.createElement)(l,{isLoading:"loading"===m,showSpinner:!0},(0,e.createElement)("div",{ref:b,id:t})))};var _;const b=(0,a.getPaymentMethodData)(r,{}),f=(0,n.__)("Apple Pay by DNA Payments",c),E=(0,o.decodeEntities)(b?.title||"")||f,h={name:r,label:(0,e.createElement)((t=>{const{PaymentMethodLabel:n}=t.components;return(0,e.createElement)(n,{text:E})}),null),content:(0,e.createElement)((t=>(0,e.createElement)(g,{componentInstance:window.DNAPayments.ApplePayComponent,gatewayId:r,containerId:"dnapayments_apple_pay_container",errorMessage:(0,n.__)("Apple Pay payments are not supported in your current browser. Please use Safari on a compatible Apple device to complete your transaction.",c),props:t})),null),edit:(0,e.createElement)((t=>(0,e.createElement)(s.RawHTML,null,(0,o.decodeEntities)(b.description||""))),null),canMakePayment:()=>!0,ariaLabel:E,supports:{features:null!==(_=b?.supports)&&void 0!==_?_:[]},placeOrderButtonLabel:E};(0,t.registerPaymentMethod)(h)})();