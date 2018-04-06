# web-page-Hint

This is show webpage hint using vue js

Add Vue js CDN :

goto this link https://vuejs.org/v2/guide/installation.html download the development version CDN link 
<script src="https://cdn.jsdelivr.net/npm/vue@2.5.16/dist/vue.js"></script>


Main js :

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

replace your custom messages in messageList arry,
replace your list of div element id's and your support email address

index.html :

Use this tooltip component

<tooltip v-bind:list="listofElements" v-bind:tooltip="messageList" 
	v-bind:support="supportText" v-bind:bshow="bShowHelp" v-bind:indexvalue="defaultIndex" ref="tooltipcomponent"></tooltip>
