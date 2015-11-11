# DrawerJS

DrawerJS is a very simple library for managing `localStorage`, with `find`, `create`, `update`, `destroy` and `query` functions.

## Usage

Link to Drawer in your HTML:

```html
<script type="text/javascript" src="drawer.min.js"></script>
```

Whenever a page load/refresh happens, Drawer must be initialized:

```javascript
Drawer.init('my_database');
```

Drawer is organized by Databases, Collections and Items, so you can have many Databases in the same domain. This also prevents from data collision with other scripts that use `localStorage`.

## Examples

All Drawer operations use simple JavaScript variables and structures. Let's create an object here:

```javascript
myRecord = {
  firstName: 'Foo',
  lastName: 'Bar'
}
```

And then, save it to Drawer:

```javascript
Drawer.create(myRecord, 'myCollection');
```

Later on, should we need this Item, retrieve it like this:

```javascript
Drawer.find(0, 'myCollection');
```

Easy! But, we can also search by any other attribute, other than the ID:

```javascript
Drawer.query([
  {
    _: {
      name: {
        eq: 'Foo'
      }
    }
  }
], 'myCollection');
```

Piece of cake. Now, let's take a look at updating our Item. Just as in `create`, we use plain JavaScript objects, as well as the Item's ID:

```javascript
myRecord.lastName = 'Baz';

Drawer.update(0, myRecord, 'myCollection');
```

Also, we can take a shortcut:

```javascript
Drawer.update(0, {lastName: 'Baz'}, 'myCollection');
```

Great! Now, let's erase our little Foo from existence using the function `destroy`:

```javascript
Drawer.destroy(0, 'myCollection');
```

## Building

Install [Grunt](http://gruntjs.com) first. After pulling the repository, `cd` to the root and run:

```
npm install
```

And, to build:

```
grunt
```

## License

TBI
