(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e=function(t,e){function r(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},n={}.hasOwnProperty;this.EditableText=function(n){function r(e){this.shouldShowBorder=t(this.shouldShowBorder,this),this.handleMouseLeave=t(this.handleMouseLeave,this),this.handleMouseEnter=t(this.handleMouseEnter,this),this.handleKeyDown=t(this.handleKeyDown,this),this.handleChange=t(this.handleChange,this),this.handleClick=t(this.handleClick,this),this.handleBlur=t(this.handleBlur,this),this.doSubmit=t(this.doSubmit,this),this.doAutocompleteSubmit=t(this.doAutocompleteSubmit,this),this.doResize=t(this.doResize,this),r.__super__.constructor.call(this,e),this.state={text:e.text,editing:!1,busy:!1,hover:!1},this.dirty=!1}return e(r,n),r.propTypes={text:React.PropTypes.string,placeholder:React.PropTypes.string,paramName:React.PropTypes.string,onCommit:React.PropTypes.func,onAutocompleteCommit:React.PropTypes.func,readonly:React.PropTypes.bool,multiline:React.PropTypes.bool,autoCompleteDictionary:React.PropTypes.array},r.prototype.componentDidMount=function(){var t;if(this.doResize(),!this.props.multiline&&null!=this.props.autoCompleteDictionary)return t=new Bloodhound({datumTokenizer:Bloodhound.tokenizers.obj.whitespace("name"),queryTokenizer:Bloodhound.tokenizers.whitespace,local:this.props.autoCompleteDictionary}),this.typeahead=$(this.input).typeahead({hint:!0,highlight:!0,minLength:1},{name:"data",displayKey:"name",source:t.ttAdapter()}),$(this.input).parents(".twitter-typeahead").css({width:this.props.style.width}),this.typeahead.on("typeahead:select typeahead:autocomplete",function(t){return function(e,n){return t.preventSubmit=!0,t.doAutocompleteSubmit(n),t.typeahead.typeahead("close")}}(this))},r.prototype.componentDidUpdate=function(){return this.doResize()},r.prototype.componentWillReceiveProps=function(t){if(t.text!==this.state.text)return this.setState({text:t.text})},r.prototype.doResize=function(){if(this.props.multiline)return this.textarea.style.height="auto",this.textarea.style.height=this.textarea.scrollHeight+2+"px"},r.prototype.doAutocompleteSubmit=function(t){var e,n;return this.dirty=!1,this.setState({busy:!0}),e={},e[""+this.props.paramName]=t,n=e,this.props.onAutocompleteCommit(n,function(t){return function(){return t.setState({busy:!1,editing:!1}),t.preventSubmit=!1}}(this)),$(this.input).blur()},r.prototype.doSubmit=function(t){var e,n;if(null==t&&(t=null),this.dirty=!1,this.setState({busy:!0}),e={},e[""+this.props.paramName]=this.state.text,n=e,this.props.onCommit(n,function(t){return function(){return t.setState({busy:!1,editing:!1})}}(this)),null!==t)return t.blur()},r.prototype.handleBlur=function(){if(this.dirty)return confirm("You have modified the text. Do you want to submit the change? ")?this.doSubmit():(this.setState({text:this.props.text,editing:!1}),this.dirty=!1)},r.prototype.handleClick=function(){return $(this.input||this.textarea).select()},r.prototype.handleChange=function(t){return this.setState({text:t.target.value,editing:!0}),this.preventSubmit||(this.dirty=!0),this.doResize()},r.prototype.handleKeyDown=function(t){return 13!==t.keyCode||(this.doSubmit(t.target),!1)},r.prototype.handleMouseEnter=function(){return this.setState({hover:!0})},r.prototype.handleMouseLeave=function(){return this.setState({hover:!1})},r.prototype.shouldShowBorder=function(){return!this.props.readonly&&(this.state.hover||this.state.editing)},r.prototype.render=function(){var t,e=this;return t=_.clone(this.props.style)||{},t.border=this.shouldShowBorder()?"1px solid #DDD":"1px solid rgba(0, 0, 0, 0)",t.padding=this.props.readonly?"0":"3px 6px",t.resize="none",t.display="block",this.props.multiline?React.createElement("textarea",{rows:"1",disabled:this.props.readonly||this.state.busy,style:t,ref:function(t){e.textarea=t},onBlur:this.handleBlur,onClick:this.handleClick,onChange:this.handleChange,onKeyDown:this.handleKeyDown,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,placeholder:this.props.placeholder,value:this.state.text}):React.createElement("input",{disabled:this.props.readonly||this.state.busy,style:t,ref:function(t){e.input=t},onBlur:this.handleBlur,onClick:this.handleClick,onChange:this.handleChange,onKeyDown:this.handleKeyDown,onMouseEnter:this.handleMouseEnter,onMouseLeave:this.handleMouseLeave,placeholder:this.props.placeholder,value:this.state.text})},r}(React.Component)}).call(this);