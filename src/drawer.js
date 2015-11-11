/*
 * Drawer.js
 * ---------
 *
 * Drawer
 *
 * TODO: no function should modify the original item.
 * TODO: add mass create/update/destroy/find functions.
 * TODO: returned items should bring their id, but discard it while saving.
 */

Drawer = {
  ls: localStorage,

  identifier: '',

  cache: {},
  
  init: function (identf) {
    this.identifier = identf;
    
    if (!this.ls.getItem(this.identifier)) {
      this.cache = {};

      this.writeToStorage();
    }

    this.readFromStorage();
  },

  /*
   * Finds a record in a collection by its `id`.
   */
  find: function (id, collection) {
    if (!this.cache[collection]) {
      console.error('Collection `%s` does not exist.', collection); 

      return;
    }

    return this.cache[collection][id];
  },

  /*
   * Searches records in a collection that match the query.
   * Returns an Array with any matching items or an empty Array if none.
   * The format is quite simple. Let's look at an example:
   *
   *   {
   *     <logicalOperator>: {
   *       <attribute>: {
   *         <comparisonOperator>: <value>
   *       }
   *     }
   *   }
   *
   * logicalOperator (and, or): when using multiple queries, this operator is
   * used to compare the results between them. The first, or only, query doesn't
   * need this, therefore a `_` can be used in place.
   *
   * attribute (String): the name of the attribute to be compared.
   *
   * comparisonOperator (eq, neq, gt, lt, geq, leq): the operator to compare the
   * attribute to a value. They are:
   *
   *   `eq`: "equal"
   *   `neq`: "not equal"
   *   `gt`: "greater than"
   *   `lt`: "less than"
   *   `geq`: "greater or equal than"
   *   `leq`: "less or equal than"
   *
   * value (*): the value used in the attribute comparison.
   */
  where: function (query, collection) {
    if (!this.cache[collection]) {
      console.error('Collection `%s` does not exist.', collection); 

      return;
    }

    var indexes = [];

    return this.cache[collection].filter(function (e) {
      var matches = true;

      for (var i = 0; i < query.length; i++) {
        var q = query[i];
        var logicalOperator = Object.keys(q)[0];
        var propertyName = Object.keys(q[logicalOperator])[0];
        var comparisonOperator = Object.keys(q[logicalOperator][propertyName])[0];
        var value = q[logicalOperator][propertyName][comparisonOperator];
        var result;

        // TODO: support more operators.
        // TODO: improve this mess.
        if (comparisonOperator == 'eq') {
          result = e[propertyName] == value;
        } else if (comparisonOperator == 'neq') {
          result = e[propertyName] != value;
        } else if (comparisonOperator == 'lt') {
          result = e[propertyName] < value;
        } else if (comparisonOperator == 'leq') {
          result = e[propertyName] <= value;
        } else if (comparisonOperator == 'gt') {
          result = e[propertyName] > value;
        } else if (comparisonOperator == 'geq') {
          result = e[propertyName] >= value;
        }

        // TODO: support more operators.
        // TODO: improve this mess.

        if (i === 0) {
          matches = result;
        } else {
          if (logicalOperator == 'and') {
            matches = matches && result;
          } else if (logicalOperator == 'or') {
            matches = matches || result;
          }
        }
      }

      return matches;
    });
  },

  /*
   * Creates a record in a collection.
   * Returns the created item.
   */
  create: function (item, collection) {
    if (!this.cache[collection]) {
      console.error('Collection `%s` does not exist.', collection); 

      return;
    }

    // FIXME: first item created in an empty database will have a `undefined` id.
    var id = parseInt(Object.keys(this.cache[collection]).reverse()[0]) + 1;

    item.createdAt = Date.now();
    item.updatedAt = Date.now();

    this.cache[collection][id] = item;
    this.writeToStorage();

    return item;
  },

  /*
   * Updates a records' attributes in a collection with an `id`.
   * Returns the updated item.
   */
  update: function (id, item, collection) {
    if (!this.cache[collection]) {
      console.error('Collection `%s` does not exist.', collection); 

      return;
    }

    if (!this.cache[collection][id]) {
      console.error('Item with id `%s` does not exist.', id);

      return;
    }

    for (var p in item) {
      if (item.hasOwnProperty(p)) {
        this.cache[collection][id][p] = item[p];
      }
    }

    this.cache[collection][id].updatedAt = Date.now();

    this.writeToStorage();

    return tempItem;
  },

  /*
   * Destroys a record in a collection with a given `id`.
   * Returns the destroyed item.
   */
  destroy: function (id, collection) {
    if (!this.cache[collection]) {
      console.error('Collection `%s` does not exist.', collection); 

      return;
    }

    if (!this.cache[collection][id]) {
      console.error('Item with id `%s` does not exist.', id);

      return;
    }

    var tempItem = this.cache[collection][id];

    delete this.cache[collection][id];

    this.writeToStorage();

    return tempItem;
  },

  /*
   * Reads from `localStorage` into the cache.
   */
  readFromStorage: function () {
    this.cache = JSON.parse(this.ls.getItem(this.identifier));
  },

  /*
   * Writes the cache to `localStorage`.
   */
  writeToStorage: function () {
    this.ls.setItem(this.identifier, JSON.stringify(this.cache));
  }
};
