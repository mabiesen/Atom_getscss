'use babel';

import GetscssView from './getscss-view';
import { CompositeDisposable } from 'atom';
import { File } from 'atom';
export default {

  getscssView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.getscssView = new GetscssView(state.getscssViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.getscssView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'getscss:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.getscssView.destroy();
  },

  serialize() {
    return {
      getscssViewState: this.getscssView.serialize()
    };
  },

	toggle() {
		let editor
	  if (editor = atom.workspace.getActiveTextEditor()) {
			let rawfilename = editor.getTitle()
			let filenamesplit = rawfilename.split(".")
			let filename = filenamesplit[0]
			let numlines = editor.getLineCount()
			let projectpath = atom.project.getPaths()
			let fullpathname = projectpath[0] + "/" + filename + ".scss"
			let myfile = new File(fullpathname)
			let verify
			if(verify = myfile.create()){
				 let classregex = new RegExp(/<div\sclass="([^"]*?)"/gi)
				 let enddivregex = new RegExp(/<\/div>/gi)
				//  let regex = new RegExp(/<([^\s]+).*?class="([^"]*?)".*?>/gi)
				 let ctr
				 let text
				 let string=""
				 let classmatches
				 let endmatches
				 let numtabs = 0
				 let tab = "\t"
				 let currenttabs
				 for(ctr=0;ctr<numlines;ctr++){
					 text = editor.lineTextForScreenRow(ctr)
					 classmatches = text.match(classregex)
					 endmatches = text.match(enddivregex)
					 for (i in classmatches) {
							 currenttabs = tab.repeat(numtabs)
					     parts = classregex.exec(classmatches[i])
							 string = string + currenttabs + "." + parts[1] + "{\n"
						 	 numtabs = numtabs + 1
						};
					 for(z in endmatches){
						  numtabs = numtabs-1
							if(numtabs == 0){
								currenttabs = ''
							}else if (numtabs == 1){
								currenttabs = tab
							}else{
						 		currenttabs = tab.repeat(2)
							};
							parts = enddivregex.exec(endmatches[z])
							string = string + currenttabs + "}\n"
						};
						classmatches = ""
						endmatches = ""
					};
				myfile.write(string)
			};
			// if(verify = myfile.create()){
			// 	myfile.write(selection)
			// };
		};

  }

};
