# Publish_AdCode
Publish advertising network code for GTM collection

## Installation Google Tag Manager 

[Google Tag Managre](https://marketingplatform.google.com/about/tag-manager/)

Paste this code as high in the <head> of the page as possible: 

```html
<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-XXXXXX');</script>
<!-- End Google Tag Manager -->
```  
## Configuration

1. Choose tag type `Custom => Custon HTML`

![GTM type a/sb6MiGd](https://i.imgur.com/s0GW9hk.jpg)

2. paste your Publish_AdCode scriptTag into the textbox and setting up triggers.

![GTM setting a/LoDnpFa](https://i.imgur.com/tunywWe.jpg)

3. Submit Changes and Publish GTM
