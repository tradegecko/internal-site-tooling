# Frontend Test with QUnit

## Types of Test

There are three types of frontend tests:

**1. Unit Test**  
    Unit test can be used to test the smallest part of your code (functions or methods).
    It should test if your functions work individually as expected.
    Unit test is apt for testing model, util functions, etc.  
    Example:
    ```js
    module('Unit | Model | Assembly', function(hooks) {
        setupUnitTest(hooks);
        hooks.beforeEach(function() {
            let store = this.owner.lookup('service:store');
            Ember.run(() => {
                let finishedVariant = store.pushNormalized('variant', {
                    id: 1,
                    name: 'Pteradactyl',
                    sku: 'BD001-03',
                    productName: 'Big dinosaur',
                });
                this.assembly = store.pushNormalized('assembly', {
                    id: 1,
                    variant: finishedVariant,
                    expected_quantity: '99',
                    assembly_number: '0005',
                    assemblyLineItems: [],
                });
            });
        });

        test('when editable is true', function(assert) {
            this.assembly.set('editable', true);
            let disabledAttributes = this.assembly.get('disabledAttributes');
            assert.deepEqual(disabledAttributes, {
                componentLineItems: null,
                expectedQuantity: null,
                variant: null,
            });
        });
    });
    ```
    In unit test, you can push the fake data directly to Ember Store without using Ember Shadow because (most likely) there will not be any API call in unit test.

**2. Integration Test**  
    Integration test is used to test the various ways you can configure your component and make sure it works as expected.  
    Normally, you wouldn't need to add fake data to server for integration test, because you can just provide the data needed by component in hashes.  
    Example:
    ```js
    module('Integration | Component | updates/article-section', function(hooks) {
        setupIntegrationTest(hooks);

        test('renders featured article', async function(assert) {
            this.article = {
                'isFeatured': true,
                'imageType': 'demand-forecasting',
                'date': '11 October 2018',
                'title': 'Demand forecasting is now in beta!',
                'featureTag': 'intelligence',
                'releaseType': 'new feature',
                'content': 'The new Demand Forecasting feature has been designed to help you avoid running out of stock or over ordering. [Check out Demand Forecasting >](forecast)',
            };

            await render(hbs `
            {{updates/article-section
                isFeatured=article.isFeatured
                articleDate=article.date
                imageType=article.imageType
                content=article.content
                title=article.title
                featureTag=article.featureTag
                releaseType=article.releaseType
            }}
            `);
            await click('a button');
            assert.dom('something').exists();
            // Check with snapshot 1 from
            // test/javascripts/integration/__snapshots__/updates/article-section.es6
            assert.dom().matchSnapshot();
        });
    });
    ```

    - Snapshot Testing  
        There are 2 types of snapshot, HTML snapshot and request snapshot.
        HTML snapshot is used to test the output HTML of a component.
        Request snapshot is used to test the request payload when client send a request to API / backend.

        For the above example, we will need a snapshot of the expected HTML produced by the component.
        We need to create a snapshot file inside `test/javascripts/integration/__snapshots__/` folder with the same hierarchy as our component (in this case is `updates/article-section.es6`).  
        HTML snapshot file example:
        ```js
        /* eslint-disable */

        const snapshots = {};
        export default snapshots;

        // The array key must be named according to your test title (e.g. 'renders featured article')
        // and the sequence of your render() function (in this example is 1).
        snapshots['renders-featured-article 1'] = `
        <div class='ember-view newFeature'>
        <article class='updates-index__article'>
            <div class='updates-index__article--featured '>
            <!-- ... expected html result ... -->
            </div>
        </article>
        </div>
        `;
        ```
        Snapshot file should not be too long in order for it to be easy to read.

**3. Acceptance Test**  
    Imagine acceptance test as a user doing stuffs in the web page.
    Ideally you should test the happy path and other possible flows in the page (e.g. what happen when user select a non-manufactured variant in Bills of Material creation).  
    Most of the examples in this page will use Acceptance test.

## Structuring the test

Tests are divided into modules with this function:
```js
module('Your test scenario', function() { });
```

The outermost module in a test file should explain what type of test is it and it's route hierarchy (e.g. `'Acceptance | Brands Edit'`, `'Unit | Model | Production Order'`).

Example:
```js
module('Acceptance | Brands', function() {
    // Do stuffs

    module('Scenario 1', function() {
        // Do more stuffs

        test('Expected Result 1', function() {
            // What should happen
        });

        module('When user tries to break stuffs', function() {
            test('The app should not explode', function() {
                // What should happen
            });
        });
    });

    module('Scenario 2', function() {
        // Do more stuffs
    });
});
```

### BDD (Behaviour Driven Development) Style Language

In BDD, modules are separated by scenarios (_when user do ..._), while tests are separated by expected result (_... will happen_).

Example test for product creation:

> As a user with write permissions in the New Product page:  
> User can see the form with its component  
> When user click new supplier button, user can add a new supplier.  
> When user tick multiple variants checkbox, user can add variant options.  
> User can create a product

- Module: As a user with write permissions in the New Product page
  - Test: User can see the form with its component  
  - Module: When user click new supplier button
    - Test: User can add a new supplier
  - Module: When user tick multiple variants checkbox
    - Test: User can add variant options
  - Test: User can create a product

More about BDD:  
https://blog.testlodge.com/what-is-bdd/  
http://toolsqa.com/cucumber/behavior-driven-development/

### AAA (Arrange, Act, Assert)

To start a test, you need to:

- Arrange the world (environment, database, etc)
- Do the actions (act with function `test(...)`)
- Assert the UI (check the UI with function `assert(...)`)

## Test helpers

### Ember Shadow

Ember Shadow helps you to arrange your test environment.
You can pass a parameter to your module callback, normally we would call it `hooks`.  
This parameter can be used to arrange your test environment (and even visit a page or click a button) before or after rendering.

You can tell your test module to do some routine before each *test or child module* with the `beforeEach` hook.

```js
hooks.beforeEach(function() {
    // Add fake data, visit a page, etc
});
renderApplication(hooks);
```

You can do the same with `afterEach` hook.  
You can render your application before or after the the hook functions.

#### Below are the examples on how to use Ember Shadow

#### Adding Fake Database Records

```js
module('Acceptance | Brands', function(hooks) {
  let server = startEmberShadow(hooks);

  hooks.beforeEach(function() {
    server.push('documentTheme', [oneDocumentTheme]);
  });
  renderApplication(hooks);
});
```
`server.push` will also create an API endpoint for your resource (e.g `get document_themes/:id`).

#### Mock AJAX Call

You can mock the **responses** of API endpoints with `server.get`, `server.post`, and other HTML request types.
```js
module('Acceptance | Updates', function(hooks) {
  let server = startEmberShadow(hooks);

  hooks.beforeEach(function() {
    server.get('/your-api-link', yourExpectedResponseJson);
  });
});
```

#### Changing The Environment Variables

```js
module('Zuora Subscription', function(hooks) {
    let testEnv = {
      env: {
        PRELOAD: {
          SUBSCRIPTION: {
             'provider': 'zuora',
          },
        },
      },
    };
    renderApplication(hooks, testEnv);
});
```

More information on Ember Shadow can be found [here](https://github.com/tradegecko/tradegecko/wiki/Ember-Shadow).

#### Tell you some secrets ;)

1. You can only have one `renderApplication` per module chain (meaning that the `renderApplication` in the parent module is also counted). Usually `renderApplication` is called in the top most module, but there are cases where you need to change environment variables in different modules which force you to have more than 1 `renderApplication` in **1 test file** (see point 2).

2. If you have multiple `renderApplication` in **1 test file**, remember to always pass `hooks` parameter to your module callback, so your module will not use the parent's `hooks`.  
    If you don't pass the `hooks` to the callback, your `renderApplication` in the child module will be hooked to the parent's `hooks`, which then caused its siblings to not be able to have their own `renderApplication`.  
    **Bad**-hooking example:
    ```js
    module('Acceptance | Order Edit', function(hooks) {
        let server = startEmberShadow(hooks);

        module('When status is draft', function() {
            // Hooked to parent's hooks
            hooks.beforeEach(function() {
                server.push('order', [draftOrder]);
            });
            // Hooked to parent's hooks
            renderApplication(hooks);

            test('Should be able to edit line item', async function(assert){
                // Test draft order
            });
        });

        module('When status is fulfilled', function() {
            // Hooked to parent's hooks
            hooks.beforeEach(function() {
                server.push('order', [fulfilledOrder]);
            });
            // This will cause an error !!
            renderApplication(hooks);

            test('Should not be able to edit line item', async function(assert){
                // Test fulfilled order
            });
        });
    });
    ```

3. If you want certain set ups to be rendered before another, you can call the hook function first, then call `renderApplication`, and call another hook function after the render.  
    Example:
    ```js
    hooks.beforeEach(function() {
        server.push('order', [oneOrderRecord]);
    });

    renderApplication(hooks);

    hooks.beforeEach(function() {
        // You can't visit '/orders/1' before pushing your fake data to the server
        visit('/orders/1');
    });
    ```

### Semantic Test Helpers

You can click links and buttons based on labels, select an option based on text, and do some other actions with the [Ember Semantic Test Helpers](https://github.com/tradegecko/ember-semantic-test-helpers) library.

### Assertions

Assert is used to select a DOM in the tested UI. You can then, execute functions on the assertion result.  
We are using [QUnit DOM](https://github.com/simplabs/qunit-dom/blob/master/API.md) and [QUnit Semantic Assertion](https://github.com/tradegecko/qunit-semantic-assertions) libraries for our assertion.

## Deprecated

Since we are using Ember Shadow now, we don't use pretender and `setupAcceptanceTest()` in **Acceptance Test**.

## Running the Test

To run the test, open `http://localhost:3000/qunit?`. You can choose the type of test you want and filter the module from QUnit UI.

## Debugging Tips

You can use `assert.async` or `debugger` to debug your test.

#### `module.only` and `test.only`

`module.only` or `test.only` will make Qunit execute only the module defined and ignore all other test modules.  
Always remember to **remove** them before committing your code to git.

#### devmode

`devmode` query param _(/qunit?devmode)_ will show the test flow in your browser page, this will not show the assertion list.

#### dockcontainer

`dockcontainer` _(/qunit?dockcontainer)_ will show the test flow in a small container on the browser page, you will still be able to see the assertion list.
