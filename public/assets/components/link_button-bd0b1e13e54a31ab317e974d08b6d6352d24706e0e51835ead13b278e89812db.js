(function(){var t=function(t,e){return function(){return t.apply(e,arguments)}},e=function(t,e){function r(){this.constructor=t}for(var i in e)n.call(e,i)&&(t[i]=e[i]);return r.prototype=e.prototype,t.prototype=new r,t.__super__=e.prototype,t},n={}.hasOwnProperty;this.LinkButton=function(n){function r(){this.handleClick=t(this.handleClick,this),this.state={busy:!1}}return e(r,n),r.propTypes={onClick:React.PropTypes.func,confirm:React.PropTypes.string},r.prototype.handleClick=function(){return this.state.busy?void logError("LinkButton clicked while supposedly disabled. "):null==this.props.confirm||confirm(this.props.confirm)?(this.setState({busy:!0}),this.props.onClick(function(t){return function(){return t.setState({busy:!1})}}(this))):void 0},r.prototype.render=function(){return React.createElement("a",{style:this.props.style,disabled:this.state.busy,onClick:this.handleClick},this.state.busy?React.createElement("i",{className:"fa fa-spin fa-circle-o-notch"}):this.props.children)},r}(React.Component)}).call(this);