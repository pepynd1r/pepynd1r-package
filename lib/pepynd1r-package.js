'use babel';

import Pepynd1rPackageView from './pepynd1r-package-view';
import { CompositeDisposable } from 'atom';

export default {

  pepynd1rPackageView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pepynd1rPackageView = new Pepynd1rPackageView(state.pepynd1rPackageViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pepynd1rPackageView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'pepynd1r-package:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pepynd1rPackageView.destroy();
  },

  serialize() {
    return {
      pepynd1rPackageViewState: this.pepynd1rPackageView.serialize()
    };
  },

  toggle() {
    console.log('Pepynd1rPackage was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
