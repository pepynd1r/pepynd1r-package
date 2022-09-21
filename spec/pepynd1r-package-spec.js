'use babel';

import Pepynd1rPackage from '../lib/pepynd1r-package';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('Pepynd1rPackage', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('pepynd1r-package');
  });

  describe('when the pepynd1r-package:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.pepynd1r-package')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'pepynd1r-package:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.pepynd1r-package')).toExist();

        let pepynd1rPackageElement = workspaceElement.querySelector('.pepynd1r-package');
        expect(pepynd1rPackageElement).toExist();

        let pepynd1rPackagePanel = atom.workspace.panelForItem(pepynd1rPackageElement);
        expect(pepynd1rPackagePanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'pepynd1r-package:toggle');
        expect(pepynd1rPackagePanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.pepynd1r-package')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'pepynd1r-package:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let pepynd1rPackageElement = workspaceElement.querySelector('.pepynd1r-package');
        expect(pepynd1rPackageElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'pepynd1r-package:toggle');
        expect(pepynd1rPackageElement).not.toBeVisible();
      });
    });
  });
});
