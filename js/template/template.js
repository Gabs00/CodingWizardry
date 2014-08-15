function App(element, html){
  this.parent = element;
  console.log(this.parent);
  this.html = html;
  this.info = {};
}

App.prototype.display = function(){
  document.write(this.template(this.html));
};

App.prototype.template = function(obj){
  return _.template(this.html, obj);
};


