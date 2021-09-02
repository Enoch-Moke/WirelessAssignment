import sqlite3
db = sqlite3.connect('db.sqlite')

db.execute('DROP TABLE IF EXISTS users')

db.execute('''CREATE TABLE users(
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    age INTEGER NOT NULL,
    gender TEXT NOT NULL
)''')

db.execute('DROP TABLE IF EXISTS meals')

db.execute('''CREATE TABLE meals(
    meal_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_email TEXT NOT NULL,
    meal_name TEXT NOT NULL,
    meal_cal INTEGER NOT NULL,
    record_date INTEGER NOT NULL,
    FOREIGN KEY(user_email) REFERENCES users(email)
)''')

db.execute('DROP TABLE IF EXISTS recipes')

db.execute('''CREATE TABLE recipes(
    recipe_id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_name TEXT NOT NULL,
    recipe_photo TEXT NOT NULL,
    recipe_instructions TEXT NOT NULL
)''')

db.execute('DROP TABLE IF EXISTS ingredients')

db.execute('''CREATE TABLE ingredients(
    ingredient_id INTEGER PRIMARY KEY AUTOINCREMENT,
    recipe_id INTEGER NOT NULL,
    ingredient_name TEXT NOT NULL,
    FOREIGN KEY(recipe_id) REFERENCES recipes(recipe_id)
)''')

db.execute('DROP TABLE IF EXISTS plans')

db.execute('''CREATE TABLE plans(
    plan_id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_name TEXT NOT NULL,
    plan_name_photo TEXT NOT NULL
)''')

db.execute('DROP TABLE IF EXISTS plan_details')

db.execute('''CREATE TABLE plan_details(
    plan_details_id INTEGER PRIMARY KEY AUTOINCREMENT,
    plan_id INTEGER NOT NULL,
    plan_days TEXT NOT NULL,
    breakfast TEXT NOT NULL,
    lunch TEXT NOT NULL,
    dinner TEXT NOT NULL,
    plan_photo TEXT NOT NULL,
    FOREIGN KEY(plan_id) REFERENCES plans(plan_id)
)''')

cursor = db.cursor()

cursor.execute('''
    INSERT INTO users(name,email,password,age,gender)
    VALUES('Angela','angela123@gmail.com','pw123','23','Female')
''')
cursor.execute('''
    INSERT INTO users(name,email,password,age,gender)
    VALUES('Ben','ben123@gmail.com','pw123','20','Male')
''')
cursor.execute('''
    INSERT INTO users(name,email,password,age,gender)
    VALUES('Daniel','daniel123@gmail.com','pw123','25','Male')
''')
cursor.execute('''
    INSERT INTO users(name,email,password,age,gender)
    VALUES('Jessica','jessica123@gmail.com','pw123','21','Female')
''')
cursor.execute('''
    INSERT INTO users(name,email,password,age,gender)
    VALUES('Derrick','derrick123@gmail.com','pw123','18','Male')
''')


cursor.execute('''
    INSERT INTO meals(user_email,meal_name,meal_cal,record_date)
    VALUES('angela123@gmail.com','KFC','600','1628726400000')
''')
cursor.execute('''
    INSERT INTO meals(user_email,meal_name,meal_cal,record_date)
    VALUES('angela123@gmail.com','Noodles','138','1628726400000')
''')
cursor.execute('''
    INSERT INTO meals(user_email,meal_name,meal_cal,record_date)
    VALUES('angela123@gmail.com','MCD','550','1628726400000')
''')


cursor.execute('''
    INSERT INTO recipes(recipe_name, recipe_photo, recipe_instructions)
    VALUES('Fridge-raid fried rice',
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/11/Fridge-raid-fried-rice-614b256.jpg?quality=90&webp=true&resize=300,272',
    '1) Heat half the vegetable oil in a wok or a frying pan over a medium-high heat, and stir-fry the onions, carrots and green beans for 5 mins. Add the peppers, broccoli and chicken, and stir-fry for 3 mins more. 2) Tip in the rice and stir-fry for another 4 mins until all the grains of rice have separated. Push the rice and vegetables to the side, then add the remaining vegetable oil to the other. Crack in the egg and scramble briefly before stirring into the veg and chicken mixture. 3) Stir in the sesame oil and oyster sauce to coat, then garnish with the spring onions and sesame seeds.')
''')
cursor.execute('''
    INSERT INTO recipes(recipe_name, recipe_photo, recipe_instructions)
    VALUES('Skinny Alfredo',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190418-skinny-alfredo-horizontal-1-1556224749.png?crop=0.650xw:0.974xh;0.148xw,0&resize=980:*',
    '1) In a large pot of salted boiling water, cook linguine according to package directions until al dente. Set aside ½ cup of pasta water, then drain pasta and set aside. 2) In a large skillet over medium heat, heat oil. Add garlic and cook until fragrant, 1 minute. Sprinkle flour over evenly, then stir and cook until mixture is lightly golden. 3) Very gradually add broth in while whisking, 2 tablespoons at a time, waiting for mixture to become completely smooth before adding more broth. Bring mixture to a boil, then gradually stream in milk while whisking. Bring to a simmer and cook until sauce is thickened, 2 to 3 minutes. 4) Remove from heat and add Parmesan and yogurt, if using. Season with salt, pepper, and a pinch of red pepper flakes. 5) Add pasta and a 1/4 cup reserved pasta water to sauce and toss to combine. If sauce is too thick add more pasta water, a tablespoon at a time, until desired consistency. 6) Garnish with parsley before serving.')
''')
cursor.execute('''
    INSERT INTO recipes(recipe_name, recipe_photo, recipe_instructions)
    VALUES('Tuscan Butter Roast Chicken',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-tuscan-butter-roast-chicken-still005-1549637202.jpg?crop=0.519xw:0.921xh;0.230xw,0.0634xh&resize=640:*',
    '1) Place a large skillet in oven and preheat to 450°. Pat chicken dry with paper towels and season generously with salt and pepper. Let sit at room temp while oven preheats and you prepare remaining ingredients. 2) In a large bowl toss together potatoes, broccoli, red onion, cherry tomatoes, and oil. Season with salt, pepper, and a pinch of red pepper flakes. 3) In a small bowl, combine butter, garlic, and Italian seasoning. Brush all over chicken. 4) Carefully remove skillet from oven and place chicken in center, then scatter vegetables around. Bake until skin is crispy and golden and internal temperature of thigh registers 165°, about 1 hour. Let rest 15 minutes. 5) Serve chicken and vegetables over a bed of spinach. Spoon additional pan drippings over, if desired and top with basil.')
''')
cursor.execute('''
    INSERT INTO recipes(recipe_name, recipe_photo, recipe_instructions)
    VALUES('Honey walnut shrimp',
    'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/honey-walnut-shrimp-vertical-1548093886.png?crop=1xw:1xh;center,top&resize=980:*',
    '1) In a small saucepan over medium heat, combine water and sugar and bring to a boil. Add walnuts and let boil for 2 minutes. Using a slotted spoon, remove walnuts and let cool on a small baking sheet. 2) Pat shrimp dry with paper towels and season lightly with salt and pepper. Place eggs in a shallow bowl and cornstarch in another shallow bowl. Dip shrimp in eggs, then in cornstarch coating well. 3) In a large skillet over medium heat, heat 1” of oil. Add shrimp in batches and fry until golden, 3 to 4 minutes. Remove with a slotted spoon and place on a paper towel lined plate. 4) In a medium bowl, whisk together mayonnaise, honey, and heavy cream. Toss shrimp in sauce. Serve over rice with candied walnuts and garnish with green onions.')
''')
cursor.execute('''
    INSERT INTO recipes(recipe_name, recipe_photo, recipe_instructions)
    VALUES('Baked Salmon',
    'https://hips.hearstapps.com/vidthumb/images/gallery-1504715772-delish-baked-salmon-1-1529531188.jpg?crop=1xw:1xh;center,top&resize=980:*',
    '1) Preheat oven to 350°. Line a large rimmed baking sheet with foil and grease with cooking spray. To the center of the foil, lay lemon slices in an even layer. 2) Season both sides of the salmon with salt and pepper and place on top of lemon slices. 3) In a small bowl, whisk together butter, honey, garlic, thyme, and oregano. Pour over salmon then fold up foil around the salmon. Bake until the salmon is cooked through, about 25 minutes. Switch the oven to broil, and broil for 2 minutes, or until the butter mixture has thickened. 4) Garnish with parsley before serving.')
''')
cursor.execute('''
    INSERT INTO recipes(recipe_name, recipe_photo, recipe_instructions)
    VALUES('Chicken Satay Salad',
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chicken-satay-salad-8f5b068.jpg?quality=90&webp=true&resize=375,341',
    '1) Pour the tamari into a large dish and stir in the curry powder, cumin, garlic and honey. Mix well. Slice the chicken breasts in half horizontally to make 4 fillets in total, then add to the marinade and mix well to coat. Set aside in the fridge for at least 1 hr, or overnight, to allow the flavours to penetrate the chicken. 2) Meanwhile, mix the peanut butter with the chilli sauce, lime juice, and 1 tbsp water to make a spoonable sauce. When ready to cook the chicken, wipe a large non-stick frying pan with a little oil. Add the chicken and cook, covered with a lid, for 5-6 mins on a medium heat, turning the fillets over for the last min, until cooked but still moist. Set aside, covered, to rest for a few mins. 3) While the chicken rests, toss the lettuce wedges with the cucumber, shallot, coriander and pomegranate, and pile onto plates. Spoon over a little sauce. Slice the chicken, pile on top of the salad and spoon over the remaining sauce. Eat while the chicken is still warm.')
''')
cursor.execute('''
    INSERT INTO recipes(recipe_name, recipe_photo, recipe_instructions)
    VALUES('Pineapple Fried Rice',
    'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/pineapple-fried-rice-25ff2b3.jpg?quality=90&webp=true&resize=375,341',
    '1) 1 Heat 1 tbsp oil in a wok. Add the eggs, swirling them up the sides, to make a thin omelette. Once cooked through, roll the omelette onto a chopping board and cut into ribbons. 2) Heat the remaining oil. Add the garlic, onions and five-spice. Stir-fry until sizzling, then add the rice (if using pouches, squeeze them first, to separate the grains), peas, sesame oil and soy. Cook over a high heat until the rice is hot, then stir through the pineapple and omelette ribbons.')
''')


cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','2 tbsp vegetable oil')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','1 white onion, finely chopped')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','1 carrot, finely chopped')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','100g green beans, chopped')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','1 red or yellow pepper, finely chopped')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','½ medium broccoli, chopped into small florets')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','150g cooked chicken (or any other meat), roughly chopped')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','300g cold cooked rice')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','2 eggs, beaten')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','1 tbsp sesame oil')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','1 tbsp oyster sauce')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','1 spring onion, finely sliced')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('1','1 tsp toasted sesame seeds')
''')

cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('2','12 oz whole-wheat linguine')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('2','1 tbsp extra-virgin olive oil')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('2','3 cloves farlic, minced')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('2','2 tbsp all-purpose flour')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('2','1 c low-sodium chicken broth')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('2','3/4 cup 1% milk')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('2','1/2 c freshly grated Parmesan')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('2','2 tbsp plain Greek yogurt (optional)')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('2','Freshly ground black pepper')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('2','Pinch crushed red pepper flakes')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('2','Freshly chopped parsley, for serving')
''')

cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','1 (3-lb) whole chicken')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','Kosher salt')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','Freshly ground black pepper')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','1 lb baby potatoes, halved')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','1 large head broccoli, cut into florets')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','1 large red onion, cut into wedges')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','2 c cherry tomatoes')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','2 tbsp extra-virgin olive oil')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','Pinch red pepper flakes')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','4 tbsp melted butter')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','3 cloves garlic, minced')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','1 tsp Italian seasoning')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','Spinach, for serving')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('3','1/4 c thinly sliced basil')
''')

cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','1 c water')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','1 c granulated sugar')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','1 c walnuts')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','1 lb shrimp, peeled and deveined')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','Kosher salt')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','Freshly ground black pepper')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','2 large eggs, beaten')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','1 c cornstarch')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','Vegetable oil for frying')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','1/4 c mayonnaise')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','2 tbsp honey')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','2 tbsp heavy cream')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','Cooked white rice, for serving')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('4','Thinly sliced green onions, for garnish')
''')

cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('5','2 lemons, thinly sliced')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('5','1 large salmon fillet (about 3 lb)')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('5','Kosher salt')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('5','Freshly ground black pepper')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('5','6 tbsp butter, melted')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('5','2 tbsp honey')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('5','3 cloves garlic, minced')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('5','1 tsp chopped thyme leaves')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('5','1 tsp dried oregano')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('5','Chopped fresh parsley, for garnish')
''')

cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','1 tbsp tamari')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','1 tsp medium curry powder')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','1/4 tsp ground cumin')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','1 garlic clove, finely grated')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','1 tsp clear honey')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','2 skinless chicken breast fillets (or use turkey breast)')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','1 tbsp crunchy peanut butter (choose a sugar-free version with no palm oil, if possible)')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','1 tbsp sweet chilli sauce')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','1 tbsp lime juice')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','sunflower oil, for wiping the pan')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','2 little gem lettuce hearts, cut into wedges')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','1/4 cucumber, halved and sliced')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','1 banana shallot, halved and thinly sliced')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','coriander, chopped')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('6','seeds from 1/2 pomegranate')
''')

cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('7','1 1/2 tbsp sunflower or vegetable oil')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('7','2 eggs, beaten')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('7','2 garlic cloves, crushed')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('7','small bunch of spring onions, chopped')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('7','1/2 tsp Chinese five-spice powder')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('7','400g cooked long-grain rice')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('7','85g frozen peas')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('7','2 tsp sesame oil')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('7','2 tbsp low-salt soy sauce')
''')
cursor.execute('''
    INSERT INTO ingredients(recipe_id, ingredient_name)
    VALUES('7','400g fresh pineapple, roughly chopped into chunks (about 1/2 medium pineapple)')
''')


cursor.execute('''
    INSERT INTO plans(plan_name, plan_name_photo)
    VALUES('Atkins Diet','https://images-na.ssl-images-amazon.com/images/I/51fzvT1Yu5L._SY445_SX342_QL70_ML2_.jpg')
''')
cursor.execute('''
    INSERT INTO plans(plan_name, plan_name_photo)
    VALUES('Zone Diet','https://pbs.twimg.com/profile_images/690250470019837953/_9ApJ5Cr_400x400.jpg')
''')
cursor.execute('''
    INSERT INTO plans(plan_name, plan_name_photo)
    VALUES('Low Carb Diet','https://media.healthyfood.com/wp-content/uploads/2021/07/Is-the-CSIRO-low-carb-diet-different-from-other-low-carb-plans-iStock-1185081258-500x500.jpg')
''')
cursor.execute('''
    INSERT INTO plans(plan_name, plan_name_photo)
    VALUES('Keto Diet','https://images-na.ssl-images-amazon.com/images/I/51joY3e3cPL._SY445_SX342_QL70_ML2_.jpg')
''')
cursor.execute('''
    INSERT INTO plans(plan_name, plan_name_photo)
    VALUES('Paleo Diet','https://miro.medium.com/max/3150/2*KmRKs9HjOgxIBBvZAq32Nw.png')
''')
cursor.execute('''
    INSERT INTO plans(plan_name, plan_name_photo)
    VALUES('Vegan Diet','https://hurrythefoodup.com/wp-content/uploads/2020/01/7-day-vegan-meal-plan-featured-image-500x500.jpg')
''')
cursor.execute('''
    INSERT INTO plans(plan_name, plan_name_photo)
    VALUES('Weight Watchers Diet','https://m.media-amazon.com/images/I/61HOUEio11L.jpg')
''')
cursor.execute('''
    INSERT INTO plans(plan_name, plan_name_photo)
    VALUES('Raw Food Diet','https://static.vitality4life.co.uk/pub/media/magefan_blog/Health-Benefits-of-a-Raw-Food-Diet.png')
''')
cursor.execute('''
    INSERT INTO plans(plan_name, plan_name_photo)
    VALUES('Mediterranean Diet','https://3i133rqau023qjc1k3txdvr1-wpengine.netdna-ssl.com/wp-content/uploads/2017/05/Mediterranean-500x500.jpg')
''')


cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('1','Day 1','Scramble Egg','Grill Chicken + Salad','Fried Chicken','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('1','Day 2','Scramble Egg','Grill Lamb + Salad','Fried Chicken with sauce', 'https://www.seekpng.com/png/detail/50-509429_plate-of-scrambled-eggs-png-scrambled-eggs-png.png')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('1','Day 3','Scramble Egg','Fried Chicken','Soup','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('1','Day 4','Lemon + Sausages','Grill Salmon','Soup','https://www.pngitem.com/pimgs/m/126-1266297_salmon-clipart-grilled-salmon-grilled-salmon-fish-png.png')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('1','Day 5','Scramble Egg','Chicken + Salad','Grill Lamb','')
''')

cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)    
    VALUES('2','Day 1','Almond BLueberry Orzo','Apple-Walnut Pasta with Chicken Sausage','Almond Chicken','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('2','Day 2','Almond Cinnamon Crepe','Arlecchino Salad','American Casserole','https://thumbs.dreamstime.com/b/oatmeal-porridge-blueberries-almonds-white-wooden-background-top-view-198762343.jpg')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('2','Day 3','Apple Jumble Zinger','Artichoke Almond Summer Orzo','American Chop Suey with Salad','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('2','Day 4','Apple Orange Breakfast Shake','Asian Cabbage Orzo Salad','Antipasto Salad','https://i.pinimg.com/originals/3d/c6/c2/3dc6c24bfb2f4c5429179606fd350280.png')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('2','Day 5','Apple Pie Spiced Oatmeal','Awesome Pasta Salad','Asian Chicken Stir Fry','')
''')

cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('3','Day 1','Spinach & Cheese Egg Muffins','Broccoli Salad','Pizza Soup','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('3','Day 2','Sausage & Red pepper frittata','Pizza Soup','Chicken & Asparagus Lemon Stir Fry','https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/spinach-cheese-egg-muffin-recipe-1553890272.png?crop=0.929xw:0.611xh;0.0224xw,0.156xh&resize=1200:*')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('3','Day 3','Chia Pudding','Turkey & Hummus Lettuce Wraps','Cream of Asparagus Soup','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('3','Day 4','Bacon, Egg, Avocado & Tomato Salad','Cream of Asparagus Soup','Thai Chicken Tacos','https://marksdailyapple.com/uploads/2010/05/BEAT_Salad_Final_72dpi-639x426.jpg')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('3','Day 5','Turkey Bacon Frittata','Avocado Tuna Salad','Cheesy Chicken Broccoli','')
''')

cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('4','Day 1','Scrambled egg lettuce wrap with avocado and cilantro','Kale Salad with grilled chicken with olive oil dressing','Steak with cauliflower rice','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('4','Day 2','Greek yogurt topped with chia seed and crushed walnuts','Cauliflower fried rice','Roast beef with sautéed mushroom and zucchini','https://images.eatthismuch.com/site_media/img/412891_kay9x102_862d01d3-ce25-4bc0-9b86-bdb667e587d0.png')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('4','Day 3','Protein shake with kale, almonds, and blackberries','Almond flour chicken tenders with greens and cheese','Grilled shrimp and asparagus with lemon butter','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('4','Day 4','Fried eggs with bacon and a side of green','Grass-fed burger in a lettuce “bun” with avocado','Meatloaf on a bed of watercress salad','https://fodmap-publicsite-us-east-2.s3.amazonaws.com/production/media/images/omelette.original.png')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('4','Day 5','Feta cheese and spinach omelette','Chicken wings with celery sticks','Grilled chicken with bell peppers and tomatoes','')
''')

cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)    
    VALUES('5','Day 1','Buffalo Strip Steak with Veggies and Bacon','Mango chicken salad with Chipotic Mayo',' Tasty Paleo Meat Loaf','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('5','Day 2','Stir Fried Kala and Bacon','Tasty Paleo Meat Loaf','Slow cooker chicken','http://3.bp.blogspot.com/_ImIXc4Bf-sg/TFOaPfasDZI/AAAAAAAABZw/53x7NrrPe84/s1600/DSC_0071.JPG')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('5','Day 3','Breakfast Squash and Sausage','Laksa Lemak','Beef Stew','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('5','Day 4','Jicama and Sausage Breakfast Pie','Basque Lamb Stew','Beef Stew','https://www.nicepng.com/png/detail/217-2178010_how-to-make-beef-stew-campbells-slow-cooker.png')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('5','Day 5','Bratwurst and German','Jambalaya','Garlic Chicken with white wine sauce','')
''')

cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)    
    VALUES('6','Day 1','All fruit except Banana','Watermelon & Cantaloupe','8 to 12 glasses of water','https://www.nicepng.com/png/detail/79-794163_cantaloupe-melon-png-clipart-cantaloupe-png.png')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('6','Day 2','Large boiled potato','Cooked or uncooked vegetables without oil','8 to 12 glasses of water','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('6','Day 3','All fruit except Banana','Cooked or uncooked vegetables without oil','8 to 12 glasses of water','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('6','Day 4','8 to 10 bananas','3 glasses of milk','8 to 12 glasses of water','https://www.seekpng.com/png/detail/9-95205_banana-png-picture-transparent-png-3-bananas.png')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('6','Day 5','Tomato soup','One cup of cooked rice','8 to 12 glasses of water','')
''')

cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)    
    VALUES('7','Day 1','Coconut banana muffins','Grilled Chicken & 2 Devilled Eggs','Fresh fruit','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('7','Day 2','2 ingredients bagel with eggs and light cheese','Air fryer tuna cakes & side salad','Mozzarella Cheese Bread Sticks','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('7','Day 3','Yogurt Parfait','IP chicken taco soup','Healthy Veggie dip & veggies','data:image/jpeg;base64,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')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('7','Day 4','Quest Bar and Fruit','Grilled Chicken & Kale with Brussels Sprouts Salad','Healthy Veggie dip & veggies','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('7','Day 5','Hard Boiled Egg, Fruit & Yogurt','IP chicken taco soup','Apple Cinnamon Muffin','https://www.onceuponachef.com/images/2015/03/Kale-and-Brussels-Sprouts-Salad3.jpg')
''')

cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)    
    VALUES('8','Day 1','Cool As a cucumber smoothie','Guacamole Stuffed Peppers','Zucchini Marinara Pasta','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('8','Day 2','Coconut Yogurt with cinnamon + nuts','Kale + Shitake Salad','Pad Thai','https://149366112.v2.pressablecdn.com/wp-content/uploads/2014/06/Raw-Vegan-Zucchini-Marinara-Pasta.jpg')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('8','Day 3','Green Juice','Gazpacho','Rainbow Sushi Rolls','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('8','Day 4','Iced Golden Milk Latte','Cauliflower Rice Tabbouleh','Spirulina Pesto Kelp Noodles','https://www.kindpng.com/picc/m/555-5554049_rainbow-roll-california-roll-hd-png-download.png')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('8','Day 5','Beet, carrot + ginger juice','Detox Shredded Salad','Pad Thai','')
''')

cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)    
    VALUES('9','Day 1','Whole grain bread with an unsweetened nut butter','Lathero Dis','A smaller serving of lunch','https://previews.123rf.com/images/markstout/markstout1606/markstout160600035/61007444-creamy-peanut-butter-spread-on-whole-wheat-bread.jpg')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('9','Day 2','Barley rusk with olive oil, crumbled cheese and olives','Pita like spanakopita with a salad on the side','A large salad','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('9','Day 3','Greek style scrambled egg with tomatoes','A bean dish','Roasted vegetables in olive oil','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('9','Day 4','Full fat Greek yogurt with nuts, fruit and honey','Greek style stewed chicken with a seasonal salad','Omelette with feta accompanied by a simple salad with olive oil','')
''')
cursor.execute('''
    INSERT INTO plan_details(plan_id, plan_days, breakfast, lunch, dinner, plan_photo)
    VALUES('9','Day 5','Whole grain bread + a piece of cheese + tomatoes','Small fatty fish with lightly boiled greens and drizzled with olive oil and some lemon','Yogurt with rusks and fruit','')
''')

db.commit()
db.close()
