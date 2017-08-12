/**
 * Created by zonebond on 2017/7/17.
 */
import {cloneElement} from 'react'
import {ItemCollection, ItemDictionary} from './ItemCollection'

export default function ReactWatcherIC() {
  const scope                         = arguments[0];
  const {render, source, update, key} = arguments[1];

  if (!render)
    throw new Error(`ReactICWatcher arguments options must has render!`);

  if (!ItemCollection.is(source) && !ItemDictionary.is(source))
    throw new Error(`ReactICWatcher arguments options's [source] must be an instance which one of ItemCollection or ItemDictionary!`);

  const defaultUpdate = () => {
    scope.forceUpdate();
  };

  const resolve = () => {
    if (!scope.updater.isMounted.call(scope, scope))
      return;

    return update ? update() : defaultUpdate();
  };

  const ic = ItemCollection.is(source) ? new ItemCollection(resolve) : new ItemDictionary(key || 'key', resolve);

  ic.when(ItemCollection.PUSH_ITEMS, (...items) => {
    return items.map((item) => {
      const view = render(item);
      return view.key ? view : cloneElement(view, {key: ic.shortenKey});
    });
  });

  const oldMount   = scope.componentWillMount;
  const oldUnmount = scope.componentWillUnmount;

  scope.componentWillMount = () => {
    ic.connect(source);
    oldMount && oldMount.call(scope);
  };

  scope.componentWillUnmount = () => {
    ic.disconnect();
    oldUnmount && oldUnmount.call(scope);
  };

  return ic;
}
