import Component from '@ember/component';
import { computed } from '@ember/object';
import { PropTypes } from 'ember-prop-types';
import layout from '../templates/components/alert-box';

const ICON_HASH = {
  warning: 'exclamation-triangle',
  error: 'exclamation-triangle',
  info: 'info-circle',
  success: 'check',
};

const AlertBox = Component.extend({
  layout,
  classNames:        'tradegecko-ui-alert-box',
  classNameBindings: ['severityClass', 'hidden:tradegecko-ui-alert-box--hidden'],
  hidden:            false,

  iconName: computed('severity', function() {
    return ICON_HASH[this.get('severity')];
  }),

  severityClass: computed('severity', function() {
    debugger
    return `tradegecko-ui-alert-box--${this.get('severity')}`;
  }),

  actions: {
    dismiss() {
      this.set('hidden', true);
      this.onDismiss();
    },
  },
});

AlertBox.propTypes = {
  severity: PropTypes.oneOf(['warning', 'error', 'info', 'success']),
  title: PropTypes.string,
  message: PropTypes.string,
  dismissable: PropTypes.bool,
  onDismiss: PropTypes.func,
};

AlertBox.defaultProps = {
  severity: 'warning',
  dismissable: false,
  onDismiss() {},
};

export default AlertBox;
