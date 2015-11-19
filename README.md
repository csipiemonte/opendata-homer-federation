# Opendata Homer Federation
Source code of the test page of the Opendata Federated Search Engine, developed by [CSI Piemonte](www.csipiemonte.it) in the European Project [HOMER](http://homerproject.eu/)

The page is visible [here](http://opendata-federation.csi.it/)

#License
The source code is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)

# How to use
Download all the source code e copy under a web server with **php enabled**

### Install under a  webserver without php
All the application is html+javascript except the file proxy.php, whose only purpose is to forward calls to the search engine, and avoid the **Cross-origin resource sharing** error

1. Rewrite the proxy.php file in the language supporter by the webserver choosed and expose under your domain
2. Edit the file app.js and change the lines
```javascript
var URL_PROXY_DOCUMENTS = "proxy.php?path="+("documents/select/")+"&params=q=";
var URL_PROXY_ADMIN = "proxy.php?path="+("documents/admin/luke/")+"&params=";
var URL_PROXY_ONTOLOGY = "proxy.php?path="+("ontology/select/")+"&params=q=";
```
with the new url mapped by your new server proxy, this is the base url to which other parameters are concatenated

In the section *Utilities* of the [example page](http://opendata-federation.csi.it/) there is a detailed example of **Server Proxy**
