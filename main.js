Vue.component('tooltip', {
	template:
		`<div id="helper-component" v-if="bshow">
			<div id="tooltip-mask"></div>
			<div id="show-current-element" v-bind:style="{width:curEleWidth +'px',
				height:curEleHeight +'px',top:curEleTop +'px',left:curEleLeft +'px'}">
				<div id="tooltip-help" v-bind:style="{top:componentTop + 'px', left:componentLeft + 'px'}">
					<span id="tooltip-current-number">{{indexvalue+1}}</span>
					<div id="tooltip-text">{{tooltip[indexvalue]}}</div>
					<div id="tooltip-bullets">
						<ul>
							<li v-for="(item,index) in list">
								<a v-bind:class="{active : index == indexvalue}" href="javascript:void(0)" @click="showCurretHelpScreen(index)"></a>
							</li>						
						</ul>
					</div>
					<div id="tooltip-buttons">
						<a class=tooltip-button button-skip href="javascript:void(0)" @click="skipAll">Skip</a>
						<a class=tooltip-button button-prev v-bind:class="{buttonDisabled : bPrevDisabled}" href="javascript:void(0)" @click="prevHelpScreen">&#8592; Prev</a>
						<a class=tooltip-button button-next v-bind:class="{buttonDisabled : bNextDisabled}" href="javascript:void(0)" @click="nextHelpScreen">Next &#8594;</a>
					</div>
					<div id="support-mail">If any problem email us at <br>
					 <a href="javascript:void(0)">{{support}}</a>
					</div>
				</div>
			</div>
		</div>`,
		props:['list','support','tooltip','bshow','indexvalue'],
		data () {
    		return {
    			bPrevDisabled: true,
    			bNextDisabled: false,
    			windowHeight:window.innerHeight,
    			windowWidth:window.innerWidth,
    			componentTop:0,
    			componentLeft:0,
    			curEleWidth:0,
    			curEleHeight:0,
    			curEleTop:0,
    			curEleLeft:0
    		}
    	},
    	mounted() {
			let that = this;
			this.$nextTick(function() {
			  window.addEventListener('resize', function(e) {
			    that.windowHeight = window.innerHeight;
			    that.windowWidth = window.innerWidth;
			  });
			  that.componentTop = (that.windowHeight / 2) - (document.querySelector('#tooltip-help').offsetHeight / 2);
			  that.componentLeft = (that.windowWidth / 2) - (document.querySelector('#tooltip-help').offsetWidth / 2);
			})
		},
    	watch: {
    		indexvalue: function(newVal,oldVal) {
    			if(this.indexvalue == 0) {
					this.bPrevDisabled = true;
					this.curEleWidth = 0;
					this.curEleHeight = 0;
					that.componentTop = (that.windowHeight / 2) - (document.querySelector('#tooltip-help').offsetHeight / 2);
					that.componentLeft = (that.windowWidth / 2) - (document.querySelector('#tooltip-help').offsetWidth / 2);
			
					// display none 
					document.querySelector('#show-current-element').style.display = "none";
				} else {
					this.bPrevDisabled = false;
					document.querySelector('#show-current-element').style.display = "block";
				}
				if(this.indexvalue == this.list.length-1) {
					this.bNextDisabled = true;
				} else {
					this.bNextDisabled = false;
				}
				if(oldVal > 0)
    				document.querySelector('#'+this.list[oldVal]).style.zIndex = "0";		

				// get Current target element width, height, top and left value
				if(this.indexvalue > 0) {
					this.curEleLeft = document.querySelector('#'+this.list[this.indexvalue]).offsetLeft;
					this.curEleTop = document.querySelector('#'+this.list[this.indexvalue]).offsetTop;
					this.curEleWidth = document.querySelector('#'+this.list[this.indexvalue]).offsetWidth;
					this.curEleHeight = document.querySelector('#'+this.list[this.indexvalue]).offsetHeight;
					//this.componentTop = 0;
					//this.componentLeft = 0;					
					document.querySelector('#'+this.list[this.indexvalue]).style.zIndex = "99999";

					// set postion of tooltip help screen 
					let totalWidth = document.querySelector('#'+this.list[this.indexvalue]).offsetLeft + 20 + document.querySelector('#tooltip-help').offsetWidth;			
					if(totalWidth <= window.innerWidth) {
						this.componentLeft = /*document.querySelector('#'+this.list[this.indexvalue]).offsetLeft*/ document.querySelector('#tooltip-help').offsetWidth + 20;
					} else {
						this.componentLeft = -(document.querySelector('#tooltip-help').offsetWidth - 20);
					}
					let totalHeight = document.querySelector('#'+this.list[this.indexvalue]).offsetTop + 20 + document.querySelector('#tooltip-help').offsetHeight;			
					if(totalHeight <= window.innerHeight) {
						this.componentTop = document.querySelector('#'+this.list[this.indexvalue]).offsetTop + 30;
					} else {
						this.componentTop =-(document.querySelector('#tooltip-help').offsetHeight - 20);
					}
				}	
				

    		}		
    	},
		methods: {
			skipAll: function() {
				this.bshow = false;
			},
			prevHelpScreen: function() {
				if(this.indexvalue > 0) {
					this.indexvalue--;
				}
			},
			nextHelpScreen: function() {
				if(this.indexvalue < this.list.length-1) {
					this.indexvalue++;
				}
			},
			showCurretHelpScreen: function(index) {
				this.indexvalue = index;
			}
		}
})

var vm = new Vue({
	el: "#webpagehelp",
	data: {
		message:"welcome to balaji web page",
		messageList:['This is help you how this website work press next button move to next hint','balaji first app','','submit your comments','thank u so much'],
		supportText:'vpbalajimca@gmail.com',
		listofElements:['','timer','sitename','code-submit', 'thanks'],
		bShowHelp:true,
		defaultIndex:0
	}
});

