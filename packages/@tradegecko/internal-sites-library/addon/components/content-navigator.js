import Component from '@glimmer/component';

export default class ContentNavigatorComponent extends Component {

  get tocArray(){
    let selectedTocs = this.args.toc.filter((toc) => toc.level == 3 || toc.level == 2);
    return selectedTocs;
  }
}
