/**
 *  Created by   阿紫
 *  On  2018/8/8
 *  Content
 */
import Vue from 'vue';

import SacDate from '@/components/sac-date';
import SacDigitalRange from '@/components/sac-digital-range';
import SacSelect from '@/components/sac-select';
import SacInput from '@/components/sac-input';
import SacSubmitForm from '@/components/sac-submit-form';
import SacPagination from '@/components/sac-pagination';
import SacTable from '@/components/sac-table';
import SacCoin from '@/components/sac-coin';
import SacTeamType from '@/components/sac-teamType';

const projectComponents = [
  SacDate,
  SacDigitalRange,
  SacSelect,
  SacInput,
  SacSubmitForm,
  SacPagination,
  SacTable,
  SacCoin,
  SacTeamType,
];
const plugin = {
  install(Vue) {
    projectComponents.forEach((comp) => {
      Vue.component(comp.name, comp);
    });
  },
};

export default plugin;
export const install = plugin.install;
