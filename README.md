## endpoint

|route     |method |require|data    |query|desc|
|-----     |-------|------ |---     |---|---|
|/         | GET   |-      | -      | -|for test api|
|/login/   | POST  | -     | *username, *password | - | for get token|
|/user/    | GET   | token | -       |- | get all users|
|/user/id  | GET   | token | *userId=id |- | get single user |
|/user/    | POST  | token | *name, *username, *role, *password |-| add new user|
|/user/id  | PUT   | token | *userId=id, *name, *role, *password |-| edit user|
|/user/id  | DELETE| token | *userId=id |-| for delete a user |
|/category/|GET    | token | - |-| get all categories|
|/category/|POST   | token | *name |-| add new category|
|/category/id|DELETE | token | *categoryId |-| delete a category
|/item/| GET| token | -|-| get all items
|/item/id| GET| token | itemId |-| get a single Item
|/item/| POST| token | *name, *unit, *category, *qty, *min, *max, *gap|-| add new item
|/item/id| PUT| token | *itemId=id, *qty, *min, *max, *gap, *category, *unit, type{typeOfActivity, value, reason}, *userId |-| edit a item 
|/item/id| DELETE| token | itemId=id |-| delete a item
|/activity/id| GET | token | - |-| get a item activities based descending date
|/activity/id| GET | token | *itemId=id|limit(number)| get all activity with limit based descending date|


```javascript 
//  
type = {
    // if typeOfActivity === 'increase', reason set to null
    typeOfActivity : String, // required, increase or decrease 
    value : Number, // required
    reason : String // optional
}
```

