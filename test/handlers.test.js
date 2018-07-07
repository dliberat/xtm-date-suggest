import { expect } from 'chai';
import {
  clickHandler,
  focusHandler,
  inputHandler,
  keyDownHandler,
  } from '../src/handlers';

describe('Event handlers', () => {
  let panel;
  let termlist;
  let eventStub;

  let setTimeout;

  before(() => {
    setTimeout = window.setTimeout;
    window.setTimeout = () => {};
  });
  after(() => {
    window.setTimeout = setTimeout;
  });

  beforeEach(() => {
      const sel = () =>  { return {
        getRangeAt: () => {
          return {
            startOffset: 3,
          };
        },
        anchorNode: {
          parentNode: {
            childNodes: [],
          }
        }
      }; };
      window.getSelection = sel;

      eventStub = {
        currentTarget: {
          id: 'sourceContent4',
        },
        preventDefault: () => {},
      };

      panel = {
        foundTermCalled: 0,
        foundTerm: () => { panel.foundTermCalled += 1; },
        getSuffix: () => { return 'gies'; },
        hideCalled: 0,
        hide: () => { panel.hideCalled += 1; },
        isVisible: () => { return true; },
      };

      termlist = {
        addSegment: () => {},
        getSegmentArray: () => { return ['bogus']; },
      };
    });

  describe('on: Click', () => {
    it('Hide the panel', () => {
      clickHandler(panel);
      expect(panel.hideCalled).to.equal(1);
    });
  });

  describe('on: Focus', () => {
    it('Hide the panel', () => {
      focusHandler(eventStub, panel, termlist);
      expect(panel.hideCalled).to.equal(1);
    });
    it('Return a list of terms', () => {
      const [ret] = focusHandler(eventStub, panel, termlist);
      expect(ret).to.equal('bogus');
    });
  });

  describe('on: Keydown', () => {
    it('Arrow keys hide panel', () => {
      eventStub.keyCode = 38;
      keyDownHandler(eventStub, panel, null);
      expect(panel.hideCalled).to.equal(1);
    });
    it('Most keys do nothing', () => {
      eventStub.keyCode = 22;
      keyDownHandler(eventStub, null, null);
    });
    it('User presses Tab key to autocomplete term', () => {
      const input = document.createElement('input');
      input.value = 'dog';
      input.focus();
      eventStub.currentTarget = input;
      const newcaret = inputHandler(eventStub, panel, null, ['doggies']);
      eventStub.keyCode = 9;
      keyDownHandler(eventStub, panel, newcaret);
      expect(input.value).to.equal('doggies');
    });
  });

  describe('on: Input', () => {
    it('Hide panel when input field is empty', () => {
      inputHandler(eventStub, panel, null, null);
      expect(panel.hideCalled).to.equal(1);
    });
    it('Return a caret', () => {
      const input = document.createElement('input');
      input.value = 'dog';
      input.focus();
      eventStub.currentTarget = input;
      const ret = inputHandler(eventStub, panel, null, []);
      expect(ret.caretPosition).is.not.undefined;
      expect(ret.currentWord).equals('dog');
    });
    it('Hide panel when caret is on an empty word', () => {
      const input = document.createElement('input');
      input.value = ' ';
      input.focus();
      eventStub.currentTarget = input;
      inputHandler(eventStub, panel, null, []);
      expect(panel.hideCalled).to.equal(1);
    });
    it('User is typing a word that is in the terms array', () => {
      const input = document.createElement('input');
      input.value = 'dog';
      input.focus();
      eventStub.currentTarget = input;
      inputHandler(eventStub, panel, null, ['doggies']);
      expect(panel.foundTermCalled).to.equal(1);
    });
  });
});

