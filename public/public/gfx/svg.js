//>>built
require({cache:{"dojox/gfx/shape":function(){define("./_base dojo/_base/lang dojo/_base/declare dojo/_base/kernel dojo/_base/sniff dojo/on dojo/_base/array dojo/dom-construct dojo/_base/Color ./matrix".split(" "),function(e,p,n,t,m,b,l,f,h,d){function q(a,d){for(var b=a.length-1;d<b;)a[d]=a[++d];a.length=b}var k=e.shape={};k.Shape=n("dojox.gfx.shape.Shape",null,{constructor:function(){this.parentMatrix=this.parent=this.bbox=this.strokeStyle=this.fillStyle=this.matrix=this.shape=this.rawNode=null;
  if(m("gfxRegistry")){var a=k.register(this);this.getUID=function(){return a}}},destroy:function(){m("gfxRegistry")&&k.dispose(this);this.rawNode&&"__gfxObject__"in this.rawNode&&(this.rawNode.__gfxObject__=null);this.rawNode=null},getNode:function(){return this.rawNode},getShape:function(){return this.shape},getTransform:function(){return this.matrix},getFill:function(){return this.fillStyle},getStroke:function(){return this.strokeStyle},getParent:function(){return this.parent},getBoundingBox:function(){return this.bbox},
  getTransformedBoundingBox:function(){var a=this.getBoundingBox();if(!a)return null;var b=this._getRealMatrix();return[d.multiplyPoint(b,a.x,a.y),d.multiplyPoint(b,a.x+a.width,a.y),d.multiplyPoint(b,a.x+a.width,a.y+a.height),d.multiplyPoint(b,a.x,a.y+a.height)]},getEventSource:function(){return this.rawNode},setClip:function(a){this.clip=a},getClip:function(){return this.clip},setShape:function(a){this.shape=e.makeParameters(this.shape,a);this.bbox=null;return this},setFill:function(a){if(!a)return this.fillStyle=
  null,this;var d=null;if("object"==typeof a&&"type"in a)switch(a.type){case "linear":d=e.makeParameters(e.defaultLinearGradient,a);break;case "radial":d=e.makeParameters(e.defaultRadialGradient,a);break;case "pattern":d=e.makeParameters(e.defaultPattern,a)}else d=e.normalizeColor(a);this.fillStyle=d;return this},setStroke:function(a){if(!a)return this.strokeStyle=null,this;if("string"==typeof a||p.isArray(a)||a instanceof h)a={color:a};a=this.strokeStyle=e.makeParameters(e.defaultStroke,a);a.color=
  e.normalizeColor(a.color);return this},setTransform:function(a){this.matrix=d.clone(a?d.normalize(a):d.identity);return this._applyTransform()},_applyTransform:function(){return this},moveToFront:function(){var a=this.getParent();a&&(a._moveChildToFront(this),this._moveToFront());return this},moveToBack:function(){var a=this.getParent();a&&(a._moveChildToBack(this),this._moveToBack());return this},_moveToFront:function(){},_moveToBack:function(){},applyRightTransform:function(a){return a?this.setTransform([this.matrix,
  a]):this},applyLeftTransform:function(a){return a?this.setTransform([a,this.matrix]):this},applyTransform:function(a){return a?this.setTransform([this.matrix,a]):this},removeShape:function(a){this.parent&&this.parent.remove(this,a);return this},_setParent:function(a,d){this.parent=a;return this._updateParentMatrix(d)},_updateParentMatrix:function(a){this.parentMatrix=a?d.clone(a):null;return this._applyTransform()},_getRealMatrix:function(){for(var a=this.matrix,b=this.parent;b;)b.matrix&&(a=d.multiply(b.matrix,
  a)),b=b.parent;return a}});k._eventsProcessing={on:function(a,d){return b(this.getEventSource(),a,k.fixCallback(this,e.fixTarget,d))},connect:function(a,d,b){"on"==a.substring(0,2)&&(a=a.substring(2));return this.on(a,b?p.hitch(d,b):d)},disconnect:function(a){return a.remove()}};k.fixCallback=function(a,d,b,g){g||(g=b,b=null);if(p.isString(g)){b=b||t.global;if(!b[g])throw['dojox.gfx.shape.fixCallback: scope["',g,'"] is null (scope\x3d"',b,'")'].join("");return function(e){return d(e,a)?b[g].apply(b,
  arguments||[]):void 0}}return b?function(e){return d(e,a)?g.apply(b,arguments||[]):void 0}:function(e){return d(e,a)?g.apply(b,arguments):void 0}};p.extend(k.Shape,k._eventsProcessing);k.Container={_init:function(){this.children=[];this._batch=0},openBatch:function(){return this},closeBatch:function(){return this},add:function(a){var d=a.getParent();d&&d.remove(a,!0);this.children.push(a);return a._setParent(this,this._getRealMatrix())},remove:function(a,d){for(var b=0;b<this.children.length;++b)if(this.children[b]==
  a){d||(a.parent=null,a.parentMatrix=null);q(this.children,b);break}return this},clear:function(a){for(var d,b=0;b<this.children.length;++b)d=this.children[b],d.parent=null,d.parentMatrix=null,a&&d.destroy();this.children=[];return this},getBoundingBox:function(){if(this.children){var a=null;l.forEach(this.children,function(b){var e=b.getBoundingBox();e&&((b=b.getTransform())&&(e=d.multiplyRectangle(b,e)),a?(a.x=Math.min(a.x,e.x),a.y=Math.min(a.y,e.y),a.endX=Math.max(a.endX,e.x+e.width),a.endY=Math.max(a.endY,
  e.y+e.height)):a={x:e.x,y:e.y,endX:e.x+e.width,endY:e.y+e.height})});a&&(a.width=a.endX-a.x,a.height=a.endY-a.y);return a}return null},_moveChildToFront:function(a){for(var b=0;b<this.children.length;++b)if(this.children[b]==a){q(this.children,b);this.children.push(a);break}return this},_moveChildToBack:function(a){for(var b=0;b<this.children.length;++b)if(this.children[b]==a){q(this.children,b);this.children.unshift(a);break}return this}};k.Surface=n("dojox.gfx.shape.Surface",null,{constructor:function(){this._parent=
  this.rawNode=null;this._nodes=[];this._events=[]},destroy:function(){l.forEach(this._nodes,f.destroy);this._nodes=[];l.forEach(this._events,function(a){a&&a.remove()});this._events=[];this.rawNode=null;if(m("ie"))for(;this._parent.lastChild;)f.destroy(this._parent.lastChild);else this._parent.innerHTML="";this._parent=null},getEventSource:function(){return this.rawNode},_getRealMatrix:function(){return null},isLoaded:!0,onLoad:function(a){},whenLoaded:function(a,d){var e=p.hitch(a,d);if(this.isLoaded)e(this);
  else b.once(this,"load",function(a){e(a)})}});p.extend(k.Surface,k._eventsProcessing);k.Rect=n("dojox.gfx.shape.Rect",k.Shape,{constructor:function(a){this.shape=e.getDefault("Rect");this.rawNode=a},getBoundingBox:function(){return this.shape}});k.Ellipse=n("dojox.gfx.shape.Ellipse",k.Shape,{constructor:function(a){this.shape=e.getDefault("Ellipse");this.rawNode=a},getBoundingBox:function(){if(!this.bbox){var a=this.shape;this.bbox={x:a.cx-a.rx,y:a.cy-a.ry,width:2*a.rx,height:2*a.ry}}return this.bbox}});
  k.Circle=n("dojox.gfx.shape.Circle",k.Shape,{constructor:function(a){this.shape=e.getDefault("Circle");this.rawNode=a},getBoundingBox:function(){if(!this.bbox){var a=this.shape;this.bbox={x:a.cx-a.r,y:a.cy-a.r,width:2*a.r,height:2*a.r}}return this.bbox}});k.Line=n("dojox.gfx.shape.Line",k.Shape,{constructor:function(a){this.shape=e.getDefault("Line");this.rawNode=a},getBoundingBox:function(){if(!this.bbox){var a=this.shape;this.bbox={x:Math.min(a.x1,a.x2),y:Math.min(a.y1,a.y2),width:Math.abs(a.x2-
  a.x1),height:Math.abs(a.y2-a.y1)}}return this.bbox}});k.Polyline=n("dojox.gfx.shape.Polyline",k.Shape,{constructor:function(a){this.shape=e.getDefault("Polyline");this.rawNode=a},setShape:function(a,b){a&&a instanceof Array?(this.inherited(arguments,[{points:a}]),b&&this.shape.points.length&&this.shape.points.push(this.shape.points[0])):this.inherited(arguments,[a]);return this},_normalizePoints:function(){var a=this.shape.points,b=a&&a.length;if(b&&"number"==typeof a[0]){for(var d=[],g=0;g<b;g+=
  2)d.push({x:a[g],y:a[g+1]});this.shape.points=d}},getBoundingBox:function(){if(!this.bbox&&this.shape.points.length){for(var a=this.shape.points,b=a.length,d=a[0],g=d.x,e=d.y,f=d.x,l=d.y,h=1;h<b;++h)d=a[h],g>d.x&&(g=d.x),f<d.x&&(f=d.x),e>d.y&&(e=d.y),l<d.y&&(l=d.y);this.bbox={x:g,y:e,width:f-g,height:l-e}}return this.bbox}});k.Image=n("dojox.gfx.shape.Image",k.Shape,{constructor:function(a){this.shape=e.getDefault("Image");this.rawNode=a},getBoundingBox:function(){return this.shape},setStroke:function(){return this},
  setFill:function(){return this}});k.Text=n(k.Shape,{constructor:function(a){this.fontStyle=null;this.shape=e.getDefault("Text");this.rawNode=a},getFont:function(){return this.fontStyle},setFont:function(a){this.fontStyle="string"==typeof a?e.splitFontString(a):e.makeParameters(e.defaultFont,a);this._setFont();return this},getBoundingBox:function(){var a=null;this.getShape().text&&(a=e._base._computeTextBoundingBox(this));return a}});k.Creator={createShape:function(a){switch(a.type){case e.defaultPath.type:return this.createPath(a);
  case e.defaultRect.type:return this.createRect(a);case e.defaultCircle.type:return this.createCircle(a);case e.defaultEllipse.type:return this.createEllipse(a);case e.defaultLine.type:return this.createLine(a);case e.defaultPolyline.type:return this.createPolyline(a);case e.defaultImage.type:return this.createImage(a);case e.defaultText.type:return this.createText(a);case e.defaultTextPath.type:return this.createTextPath(a)}return null},createGroup:function(){return this.createObject(e.Group)},createRect:function(a){return this.createObject(e.Rect,
  a)},createEllipse:function(a){return this.createObject(e.Ellipse,a)},createCircle:function(a){return this.createObject(e.Circle,a)},createLine:function(a){return this.createObject(e.Line,a)},createPolyline:function(a){return this.createObject(e.Polyline,a)},createImage:function(a){return this.createObject(e.Image,a)},createText:function(a){return this.createObject(e.Text,a)},createPath:function(a){return this.createObject(e.Path,a)},createTextPath:function(a){return this.createObject(e.TextPath,{}).setText(a)},
  createObject:function(a,b){return null}};return k})},"dojox/gfx/path":function(){define(["./_base","dojo/_base/lang","dojo/_base/declare","./matrix","./shape"],function(e,p,n,t,m){m=n("dojox.gfx.path.Path",m.Shape,{constructor:function(b){this.shape=p.clone(e.defaultPath);this.segments=[];this.tbbox=null;this.absolute=!0;this.last={};this.rawNode=b;this.segmented=!1},setAbsoluteMode:function(b){this._confirmSegmented();this.absolute="string"==typeof b?"absolute"==b:b;return this},getAbsoluteMode:function(){this._confirmSegmented();
  return this.absolute},getBoundingBox:function(){this._confirmSegmented();return this.bbox&&"l"in this.bbox?{x:this.bbox.l,y:this.bbox.t,width:this.bbox.r-this.bbox.l,height:this.bbox.b-this.bbox.t}:null},_getRealBBox:function(){this._confirmSegmented();if(this.tbbox)return this.tbbox;var b=this.bbox,e=this._getRealMatrix();this.bbox=null;for(var f=0,h=this.segments.length;f<h;++f)this._updateWithSegment(this.segments[f],e);e=this.bbox;this.bbox=b;return this.tbbox=e?[{x:e.l,y:e.t},{x:e.r,y:e.t},{x:e.r,
  y:e.b},{x:e.l,y:e.b}]:null},getLastPosition:function(){this._confirmSegmented();return"x"in this.last?this.last:null},_applyTransform:function(){this.tbbox=null;return this.inherited(arguments)},_updateBBox:function(b,e,f){f&&(e=t.multiplyPoint(f,b,e),b=e.x,e=e.y);this.bbox&&"l"in this.bbox?(this.bbox.l>b&&(this.bbox.l=b),this.bbox.r<b&&(this.bbox.r=b),this.bbox.t>e&&(this.bbox.t=e),this.bbox.b<e&&(this.bbox.b=e)):this.bbox={l:b,b:e,r:b,t:e}},_updateWithSegment:function(b,l){var f=b.args,h=f.length,
  d;switch(b.action){case "M":case "L":case "C":case "S":case "Q":case "T":for(d=0;d<h;d+=2)this._updateBBox(f[d],f[d+1],l);this.last.x=f[h-2];this.last.y=f[h-1];this.absolute=!0;break;case "H":for(d=0;d<h;++d)this._updateBBox(f[d],this.last.y,l);this.last.x=f[h-1];this.absolute=!0;break;case "V":for(d=0;d<h;++d)this._updateBBox(this.last.x,f[d],l);this.last.y=f[h-1];this.absolute=!0;break;case "m":d=0;"x"in this.last||(this._updateBBox(this.last.x=f[0],this.last.y=f[1],l),d=2);for(;d<h;d+=2)this._updateBBox(this.last.x+=
  f[d],this.last.y+=f[d+1],l);this.absolute=!1;break;case "l":case "t":for(d=0;d<h;d+=2)this._updateBBox(this.last.x+=f[d],this.last.y+=f[d+1],l);this.absolute=!1;break;case "h":for(d=0;d<h;++d)this._updateBBox(this.last.x+=f[d],this.last.y,l);this.absolute=!1;break;case "v":for(d=0;d<h;++d)this._updateBBox(this.last.x,this.last.y+=f[d],l);this.absolute=!1;break;case "c":for(d=0;d<h;d+=6)this._updateBBox(this.last.x+f[d],this.last.y+f[d+1],l),this._updateBBox(this.last.x+f[d+2],this.last.y+f[d+3],l),
  this._updateBBox(this.last.x+=f[d+4],this.last.y+=f[d+5],l);this.absolute=!1;break;case "s":case "q":for(d=0;d<h;d+=4)this._updateBBox(this.last.x+f[d],this.last.y+f[d+1],l),this._updateBBox(this.last.x+=f[d+2],this.last.y+=f[d+3],l);this.absolute=!1;break;case "A":for(d=0;d<h;d+=7)this._updateBBox(f[d+5],f[d+6],l);this.last.x=f[h-2];this.last.y=f[h-1];this.absolute=!0;break;case "a":for(d=0;d<h;d+=7)this._updateBBox(this.last.x+=f[d+5],this.last.y+=f[d+6],l);this.absolute=!1}b=[b.action];for(d=0;d<
  h;++d)b.push(e.formatNumber(f[d],!0));if("string"==typeof this.shape.path)this.shape.path+=b.join("");else for(d=0,h=b.length;d<h;++d)this.shape.path.push(b[d])},_validSegments:{m:2,l:2,h:1,v:1,c:6,s:4,q:4,t:2,a:7,z:0},_pushSegment:function(b,e){this.tbbox=null;var f=this._validSegments[b.toLowerCase()];"number"==typeof f&&(f?e.length>=f&&(b={action:b,args:e.slice(0,e.length-e.length%f)},this.segments.push(b),this._updateWithSegment(b)):(b={action:b,args:[]},this.segments.push(b),this._updateWithSegment(b)))},
  _collectArgs:function(b,e){for(var f=0;f<e.length;++f){var h=e[f];"boolean"==typeof h?b.push(h?1:0):"number"==typeof h?b.push(h):h instanceof Array?this._collectArgs(b,h):"x"in h&&"y"in h&&b.push(h.x,h.y)}},moveTo:function(){this._confirmSegmented();var b=[];this._collectArgs(b,arguments);this._pushSegment(this.absolute?"M":"m",b);return this},lineTo:function(){this._confirmSegmented();var b=[];this._collectArgs(b,arguments);this._pushSegment(this.absolute?"L":"l",b);return this},hLineTo:function(){this._confirmSegmented();
  var b=[];this._collectArgs(b,arguments);this._pushSegment(this.absolute?"H":"h",b);return this},vLineTo:function(){this._confirmSegmented();var b=[];this._collectArgs(b,arguments);this._pushSegment(this.absolute?"V":"v",b);return this},curveTo:function(){this._confirmSegmented();var b=[];this._collectArgs(b,arguments);this._pushSegment(this.absolute?"C":"c",b);return this},smoothCurveTo:function(){this._confirmSegmented();var b=[];this._collectArgs(b,arguments);this._pushSegment(this.absolute?"S":
  "s",b);return this},qCurveTo:function(){this._confirmSegmented();var b=[];this._collectArgs(b,arguments);this._pushSegment(this.absolute?"Q":"q",b);return this},qSmoothCurveTo:function(){this._confirmSegmented();var b=[];this._collectArgs(b,arguments);this._pushSegment(this.absolute?"T":"t",b);return this},arcTo:function(){this._confirmSegmented();var b=[];this._collectArgs(b,arguments);this._pushSegment(this.absolute?"A":"a",b);return this},closePath:function(){this._confirmSegmented();this._pushSegment("Z",
  []);return this},_confirmSegmented:function(){if(!this.segmented){var b=this.shape.path;this.shape.path=[];this._setPath(b);this.shape.path=this.shape.path.join("");this.segmented=!0}},_setPath:function(b){b=p.isArray(b)?b:b.match(e.pathSvgRegExp);this.segments=[];this.absolute=!0;this.bbox={};this.last={};if(b){for(var l="",f=[],h=b.length,d=0;d<h;++d){var m=b[d],k=parseFloat(m);isNaN(k)?(l&&this._pushSegment(l,f),f=[],l=m):f.push(k)}this._pushSegment(l,f)}},setShape:function(b){this.inherited(arguments,
  ["string"==typeof b?{path:b}:b]);this.segmented=!1;this.segments=[];e.lazyPathSegmentation||this._confirmSegmented();return this},_2PI:2*Math.PI});n=n("dojox.gfx.path.TextPath",m,{constructor:function(b){"text"in this||(this.text=p.clone(e.defaultTextPath));"fontStyle"in this||(this.fontStyle=p.clone(e.defaultFont))},getText:function(){return this.text},setText:function(b){this.text=e.makeParameters(this.text,"string"==typeof b?{text:b}:b);this._setText();return this},getFont:function(){return this.fontStyle},
  setFont:function(b){this.fontStyle="string"==typeof b?e.splitFontString(b):e.makeParameters(e.defaultFont,b);this._setFont();return this}});return e.path={Path:m,TextPath:n}})},"*noref":1}});
  define("dojox/gfx/svg","dojo/_base/lang dojo/_base/sniff dojo/_base/window dojo/dom dojo/_base/declare dojo/_base/array dojo/dom-geometry dojo/dom-attr dojo/_base/Color ./_base ./shape ./path".split(" "),function(e,p,n,t,m,b,l,f,h,d,q,k){function a(c,a){return n.doc.createElementNS?n.doc.createElementNS(c,a):n.doc.createElement(a)}function w(c,a,b,d){return c.setAttributeNS?c.setAttributeNS(a,b,d):c.setAttribute(b,d)}function x(c){return g.useSvgWeb?n.doc.createTextNode(c,!0):n.doc.createTextNode(c)}
  var g=d.svg={};g.useSvgWeb="undefined"!=typeof window.svgweb;var z=navigator.userAgent,A=p("ios"),y=p("android"),B=p("chrome")||y&&4<=y?"auto":"optimizeLegibility";g.xmlns={xlink:"http://www.w3.org/1999/xlink",svg:"http://www.w3.org/2000/svg"};g.getRef=function(c){return c&&"none"!=c?c.match(/^url\(#.+\)$/)?t.byId(c.slice(5,-1)):c.match(/^#dojoUnique\d+$/)?t.byId(c.slice(1)):null:null};g.dasharray={solid:"none",shortdash:[4,1],shortdot:[1,1],shortdashdot:[4,1,1,1],shortdashdotdot:[4,1,1,1,1,1],dot:[1,
  3],dash:[4,3],longdash:[8,3],dashdot:[4,3,1,3],longdashdot:[8,3,1,3],longdashdotdot:[8,3,1,3,1,3]};var C=0;g.Shape=m("dojox.gfx.svg.Shape",q.Shape,{destroy:function(){if(this.fillStyle&&"type"in this.fillStyle){var c=this.rawNode.getAttribute("fill");(c=g.getRef(c))&&c.parentNode.removeChild(c)}this.clip&&(c=this.rawNode.getAttribute("clip-path"))&&(c=t.byId(c.match(/gfx_clip[\d]+/)[0]))&&c.parentNode.removeChild(c);q.Shape.prototype.destroy.apply(this,arguments)},setFill:function(c){if(!c)return this.fillStyle=
  null,this.rawNode.setAttribute("fill","none"),this.rawNode.setAttribute("fill-opacity",0),this;var a,e=function(c){this.setAttribute(c,a[c].toFixed(8))};if("object"==typeof c&&"type"in c){switch(c.type){case "linear":a=d.makeParameters(d.defaultLinearGradient,c);c=this._setFillObject(a,"linearGradient");b.forEach(["x1","y1","x2","y2"],e,c);break;case "radial":a=d.makeParameters(d.defaultRadialGradient,c);c=this._setFillObject(a,"radialGradient");b.forEach(["cx","cy","r"],e,c);break;case "pattern":a=
  d.makeParameters(d.defaultPattern,c),c=this._setFillObject(a,"pattern"),b.forEach(["x","y","width","height"],e,c)}this.fillStyle=a;return this}this.fillStyle=a=d.normalizeColor(c);this.rawNode.setAttribute("fill",a.toCss());this.rawNode.setAttribute("fill-opacity",a.a);this.rawNode.setAttribute("fill-rule","evenodd");return this},setStroke:function(c){var a=this.rawNode;if(!c)return this.strokeStyle=null,a.setAttribute("stroke","none"),a.setAttribute("stroke-opacity",0),this;if("string"==typeof c||
  e.isArray(c)||c instanceof h)c={color:c};c=this.strokeStyle=d.makeParameters(d.defaultStroke,c);c.color=d.normalizeColor(c.color);if(c){var b=0>c.width?0:c.width;a.setAttribute("stroke",c.color.toCss());a.setAttribute("stroke-opacity",c.color.a);a.setAttribute("stroke-width",b);a.setAttribute("stroke-linecap",c.cap);"number"==typeof c.join?(a.setAttribute("stroke-linejoin","miter"),a.setAttribute("stroke-miterlimit",c.join)):a.setAttribute("stroke-linejoin",c.join);var f=c.style.toLowerCase();f in
  g.dasharray&&(f=g.dasharray[f]);if(f instanceof Array){var f=e._toArray(f),r;for(r=0;r<f.length;++r)f[r]*=b;if("butt"!=c.cap){for(r=0;r<f.length;r+=2)f[r]-=b,1>f[r]&&(f[r]=1);for(r=1;r<f.length;r+=2)f[r]+=b}f=f.join(",")}a.setAttribute("stroke-dasharray",f);a.setAttribute("dojoGfxStrokeStyle",c.style)}return this},_getParentSurface:function(){for(var c=this.parent;c&&!(c instanceof d.Surface);c=c.parent);return c},_setFillObject:function(c,b){var e=g.xmlns.svg;this.fillStyle=c;var u=this._getParentSurface().defNode,
  f=this.rawNode.getAttribute("fill");if(f=g.getRef(f))if(f.tagName.toLowerCase()!=b.toLowerCase()){var h=f.id;f.parentNode.removeChild(f);f=a(e,b);f.setAttribute("id",h);u.appendChild(f)}else for(;f.childNodes.length;)f.removeChild(f.lastChild);else f=a(e,b),f.setAttribute("id",d._base._getUniqueId()),u.appendChild(f);if("pattern"==b)f.setAttribute("patternUnits","userSpaceOnUse"),e=a(e,"image"),e.setAttribute("x",0),e.setAttribute("y",0),e.setAttribute("width",(0>c.width?0:c.width).toFixed(8)),e.setAttribute("height",
  (0>c.height?0:c.height).toFixed(8)),w(e,g.xmlns.xlink,"xlink:href",c.src),f.appendChild(e);else for(f.setAttribute("gradientUnits","userSpaceOnUse"),b=0;b<c.colors.length;++b){var u=c.colors[b],h=a(e,"stop"),k=u.color=d.normalizeColor(u.color);h.setAttribute("offset",u.offset.toFixed(8));h.setAttribute("stop-color",k.toCss());h.setAttribute("stop-opacity",k.a);f.appendChild(h)}this.rawNode.setAttribute("fill","url(#"+f.getAttribute("id")+")");this.rawNode.removeAttribute("fill-opacity");this.rawNode.setAttribute("fill-rule",
  "evenodd");return f},_applyTransform:function(){if(this.matrix){var c=this.matrix;this.rawNode.setAttribute("transform","matrix("+c.xx.toFixed(8)+","+c.yx.toFixed(8)+","+c.xy.toFixed(8)+","+c.yy.toFixed(8)+","+c.dx.toFixed(8)+","+c.dy.toFixed(8)+")")}else this.rawNode.removeAttribute("transform");return this},setRawNode:function(c){c=this.rawNode=c;"image"!=this.shape.type&&c.setAttribute("fill","none");c.setAttribute("fill-opacity",0);c.setAttribute("stroke","none");c.setAttribute("stroke-opacity",
  0);c.setAttribute("stroke-width",1);c.setAttribute("stroke-linecap","butt");c.setAttribute("stroke-linejoin","miter");c.setAttribute("stroke-miterlimit",4);c.__gfxObject__=this},setShape:function(c){this.shape=d.makeParameters(this.shape,c);for(var a in this.shape)if("type"!=a){c=this.shape[a];if("width"===a||"height"===a)c=0>c?0:c;this.rawNode.setAttribute(a,c)}this.bbox=null;return this},_moveToFront:function(){this.rawNode.parentNode.appendChild(this.rawNode);return this},_moveToBack:function(){this.rawNode.parentNode.insertBefore(this.rawNode,
  this.rawNode.parentNode.firstChild);return this},setClip:function(c){this.inherited(arguments);var b=c?"width"in c?"rect":"cx"in c?"ellipse":"points"in c?"polyline":"d"in c?"path":null:null;if(c&&!b)return this;"polyline"===b&&(c=e.clone(c),c.points=c.points.join(","));var d,h=f.get(this.rawNode,"clip-path");h&&(d=t.byId(h.match(/gfx_clip[\d]+/)[0]))&&d.removeChild(d.childNodes[0]);c?(d?(b=a(g.xmlns.svg,b),d.appendChild(b)):(h="gfx_clip"+ ++C,this.rawNode.setAttribute("clip-path","url(#"+h+")"),d=
  a(g.xmlns.svg,"clipPath"),b=a(g.xmlns.svg,b),d.appendChild(b),this.rawNode.parentNode.insertBefore(d,this.rawNode),f.set(d,"id",h)),f.set(b,c)):(this.rawNode.removeAttribute("clip-path"),d&&d.parentNode.removeChild(d));return this},_removeClipNode:function(){var c,a=f.get(this.rawNode,"clip-path");a&&(c=t.byId(a.match(/gfx_clip[\d]+/)[0]))&&c.parentNode.removeChild(c);return c}});g.Group=m("dojox.gfx.svg.Group",g.Shape,{constructor:function(){q.Container._init.call(this)},setRawNode:function(a){this.rawNode=
  a;this.rawNode.__gfxObject__=this},destroy:function(){this.clear(!0);g.Shape.prototype.destroy.apply(this,arguments)}});g.Group.nodeType="g";g.Rect=m("dojox.gfx.svg.Rect",[g.Shape,q.Rect],{setShape:function(a){this.shape=d.makeParameters(this.shape,a);this.bbox=null;for(var c in this.shape)if("type"!=c&&"r"!=c){a=this.shape[c];if("width"===c||"height"===c)a=0>a?0:a;this.rawNode.setAttribute(c,a)}null!=this.shape.r&&(this.rawNode.setAttribute("ry",this.shape.r),this.rawNode.setAttribute("rx",this.shape.r));
  return this}});g.Rect.nodeType="rect";g.Ellipse=m("dojox.gfx.svg.Ellipse",[g.Shape,q.Ellipse],{});g.Ellipse.nodeType="ellipse";g.Circle=m("dojox.gfx.svg.Circle",[g.Shape,q.Circle],{});g.Circle.nodeType="circle";g.Line=m("dojox.gfx.svg.Line",[g.Shape,q.Line],{});g.Line.nodeType="line";g.Polyline=m("dojox.gfx.svg.Polyline",[g.Shape,q.Polyline],{setShape:function(a,b){a&&a instanceof Array?(this.shape=d.makeParameters(this.shape,{points:a}),b&&this.shape.points.length&&this.shape.points.push(this.shape.points[0])):
  this.shape=d.makeParameters(this.shape,a);this.bbox=null;this._normalizePoints();a=[];b=this.shape.points;for(var c=0;c<b.length;++c)a.push(b[c].x.toFixed(8),b[c].y.toFixed(8));this.rawNode.setAttribute("points",a.join(" "));return this}});g.Polyline.nodeType="polyline";g.Image=m("dojox.gfx.svg.Image",[g.Shape,q.Image],{setShape:function(a){this.shape=d.makeParameters(this.shape,a);this.bbox=null;a=this.rawNode;for(var c in this.shape)if("type"!=c&&"src"!=c){var b=this.shape[c];if("width"===c||"height"===
  c)b=0>b?0:b;a.setAttribute(c,b)}a.setAttribute("preserveAspectRatio","none");w(a,g.xmlns.xlink,"xlink:href",this.shape.src);a.__gfxObject__=this;return this}});g.Image.nodeType="image";g.Text=m("dojox.gfx.svg.Text",[g.Shape,q.Text],{setShape:function(a){this.shape=d.makeParameters(this.shape,a);this.bbox=null;a=this.rawNode;var c=this.shape;a.setAttribute("x",c.x);a.setAttribute("y",c.y);a.setAttribute("text-anchor",c.align);a.setAttribute("text-decoration",c.decoration);a.setAttribute("rotate",c.rotated?
  90:0);a.setAttribute("kerning",c.kerning?"auto":0);a.setAttribute("text-rendering",B);a.firstChild?a.firstChild.nodeValue=c.text:a.appendChild(x(c.text));return this},getTextWidth:function(){var a=this.rawNode,b=a.parentNode,a=a.cloneNode(!0);a.style.visibility="hidden";var d=0,e=a.firstChild.nodeValue;b.appendChild(a);if(""!=e)for(;!d;)d=a.getBBox?parseInt(a.getBBox().width):68;b.removeChild(a);return d},getBoundingBox:function(){var a=null;if(this.getShape().text)try{a=this.rawNode.getBBox()}catch(u){a=
  {x:0,y:0,width:0,height:0}}return a}});g.Text.nodeType="text";g.Path=m("dojox.gfx.svg.Path",[g.Shape,k.Path],{_updateWithSegment:function(a){this.inherited(arguments);"string"==typeof this.shape.path&&this.rawNode.setAttribute("d",this.shape.path)},setShape:function(a){this.inherited(arguments);this.shape.path?this.rawNode.setAttribute("d",this.shape.path):this.rawNode.removeAttribute("d");return this}});g.Path.nodeType="path";g.TextPath=m("dojox.gfx.svg.TextPath",[g.Shape,k.TextPath],{_updateWithSegment:function(a){this.inherited(arguments);
  this._setTextPath()},setShape:function(a){this.inherited(arguments);this._setTextPath();return this},_setTextPath:function(){if("string"==typeof this.shape.path){var c=this.rawNode;if(!c.firstChild){var b=a(g.xmlns.svg,"textPath"),e=x("");b.appendChild(e);c.appendChild(b)}b=(b=c.firstChild.getAttributeNS(g.xmlns.xlink,"href"))&&g.getRef(b);if(!b&&(e=this._getParentSurface())){var e=e.defNode,b=a(g.xmlns.svg,"path"),f=d._base._getUniqueId();b.setAttribute("id",f);e.appendChild(b);w(c.firstChild,g.xmlns.xlink,
  "xlink:href","#"+f)}b&&b.setAttribute("d",this.shape.path)}},_setText:function(){var c=this.rawNode;if(!c.firstChild){var b=a(g.xmlns.svg,"textPath"),d=x("");b.appendChild(d);c.appendChild(b)}c=c.firstChild;b=this.text;c.setAttribute("alignment-baseline","middle");switch(b.align){case "middle":c.setAttribute("text-anchor","middle");c.setAttribute("startOffset","50%");break;case "end":c.setAttribute("text-anchor","end");c.setAttribute("startOffset","100%");break;default:c.setAttribute("text-anchor",
  "start"),c.setAttribute("startOffset","0%")}c.setAttribute("baseline-shift","0.5ex");c.setAttribute("text-decoration",b.decoration);c.setAttribute("rotate",b.rotated?90:0);c.setAttribute("kerning",b.kerning?"auto":0);c.firstChild.data=b.text}});g.TextPath.nodeType="text";var D=534<function(){var a=/WebKit\/(\d*)/.exec(z);return a?a[1]:0}();g.Surface=m("dojox.gfx.svg.Surface",q.Surface,{constructor:function(){q.Container._init.call(this)},destroy:function(){q.Container.clear.call(this,!0);this.defNode=
  null;this.inherited(arguments)},setDimensions:function(a,b){if(!this.rawNode)return this;a=0>a?0:a;b=0>b?0:b;this.rawNode.setAttribute("width",a);this.rawNode.setAttribute("height",b);D&&(this.rawNode.style.width=a,this.rawNode.style.height=b);return this},getDimensions:function(){return this.rawNode?{width:d.normalizedLength(this.rawNode.getAttribute("width")),height:d.normalizedLength(this.rawNode.getAttribute("height"))}:null}});g.createSurface=function(c,b,e){var f=new g.Surface;f.rawNode=a(g.xmlns.svg,
  "svg");f.rawNode.setAttribute("overflow","hidden");b&&f.rawNode.setAttribute("width",0>b?0:b);e&&f.rawNode.setAttribute("height",0>e?0:e);b=a(g.xmlns.svg,"defs");f.rawNode.appendChild(b);f.defNode=b;f._parent=t.byId(c);f._parent.appendChild(f.rawNode);d._base._fixMsTouchAction(f);return f};p={_setFont:function(){var a=this.fontStyle;this.rawNode.setAttribute("font-style",a.style);this.rawNode.setAttribute("font-variant",a.variant);this.rawNode.setAttribute("font-weight",a.weight);this.rawNode.setAttribute("font-size",
  a.size);this.rawNode.setAttribute("font-family",a.family)}};var v=q.Container;m=g.Container={openBatch:function(){if(!this._batch){var a;a=g.useSvgWeb?n.doc.createDocumentFragment(!0):n.doc.createDocumentFragment();this.fragment=a}++this._batch;return this},closeBatch:function(){this._batch=0<this._batch?--this._batch:0;this.fragment&&!this._batch&&(this.rawNode.appendChild(this.fragment),delete this.fragment);return this},add:function(a){this!=a.getParent()&&(this.fragment?this.fragment.appendChild(a.rawNode):
  this.rawNode.appendChild(a.rawNode),v.add.apply(this,arguments),a.setClip(a.clip));return this},remove:function(a,b){this==a.getParent()&&(this.rawNode==a.rawNode.parentNode&&this.rawNode.removeChild(a.rawNode),this.fragment&&this.fragment==a.rawNode.parentNode&&this.fragment.removeChild(a.rawNode),a._removeClipNode(),v.remove.apply(this,arguments));return this},clear:function(){for(var a=this.rawNode;a.lastChild;)a.removeChild(a.lastChild);var b=this.defNode;if(b){for(;b.lastChild;)b.removeChild(b.lastChild);
  a.appendChild(b)}return v.clear.apply(this,arguments)},getBoundingBox:v.getBoundingBox,_moveChildToFront:v._moveChildToFront,_moveChildToBack:v._moveChildToBack};k=g.Creator={createObject:function(b,d){if(!this.rawNode)return null;var c=new b;b=a(g.xmlns.svg,b.nodeType);c.setRawNode(b);c.setShape(d);this.add(c);return c}};e.extend(g.Text,p);e.extend(g.TextPath,p);e.extend(g.Group,m);e.extend(g.Group,q.Creator);e.extend(g.Group,k);e.extend(g.Surface,m);e.extend(g.Surface,q.Creator);e.extend(g.Surface,
  k);g.fixTarget=function(a,b){a.gfxTarget||(a.gfxTarget=A&&a.target.wholeText?a.target.parentElement.__gfxObject__:a.target.__gfxObject__);return!0};g.useSvgWeb&&(g.createSurface=function(b,e,f){var c=new g.Surface;e=0>e?0:e;f=0>f?0:f;if(!e||!f){var h=l.position(b);e=e||h.w;f=f||h.h}b=t.byId(b);var h=b.id?b.id+"_svgweb":d._base._getUniqueId(),k=a(g.xmlns.svg,"svg");k.id=h;k.setAttribute("width",e);k.setAttribute("height",f);svgweb.appendChild(k,b);k.addEventListener("SVGLoad",function(){c.rawNode=
  this;c.isLoaded=!0;var b=a(g.xmlns.svg,"defs");c.rawNode.appendChild(b);c.defNode=b;if(c.onLoad)c.onLoad(c)},!1);c.isLoaded=!1;return c},g.Surface.extend({destroy:function(){var a=this.rawNode;svgweb.removeChild(a,a.parentNode)}}),p={connect:function(a,b,d){"on"===a.substring(0,2)&&(a=a.substring(2));d=2==arguments.length?b:e.hitch(b,d);this.getEventSource().addEventListener(a,d,!1);return[this,a,d]},disconnect:function(a){this.getEventSource().removeEventListener(a[1],a[2],!1);delete a[0]}},e.extend(g.Shape,
  p),e.extend(g.Surface,p));return g});