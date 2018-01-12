import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  term: Ember.inject.service(),

  model() {
    return {
      record: this.store.createRecord('simple-event', {
        published: true
      }),
      categories: this.get('term')
                      .getSystemCategories()
    };
  },
  actions: {
    save(record) {
      record.save()
      .then( (r)=> {
        this.get('notifications')
            .success('Evento registrado com sucesso.');

        this.transitionTo('simple-events.item', r.id);
        this.send('scrollToTop');
        // success
        return r;
      })
      .catch( (err)=> {
        this.send('queryError', err);
        return null;
      });
    }
  }
});