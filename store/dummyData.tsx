import { FavouriteItem } from "../components/favourite/Item";
import { CoffeeBeanType } from "../components/home/CoffeeBeansFlatList";
import { CoffeeType } from "../components/home/CoffeeTypesFlatList";
import { OrderItemType } from "../components/orderHistory/OrderItem";
import {
  CoffeeBeanCartItemType,
  CoffeeCartItemType,
} from "../screens/CartScreen";

// CoffeeDummyData is from Home Screen
export const CoffeeDummyData: CoffeeType[] = [
  {
    id: 1,
    name: "Espresso",
    shortDescription: "With Steamed Milk",
    longDescription:
      "Espresso is a coffee-brewing method of Italian origin, in which a small amount of nearly boiling water is forced under pressure through finely-ground coffee beans. Espresso coffee can be made with a wide variety of coffee beans and roast degrees. Espresso is generally thicker than coffee brewed by other methods, has a higher concentration of suspended and dissolved solids, and has crema on top (a foam with a creamy consistency). As a result of the pressurized brewing process, the flavors and chemicals in a typical cup of espresso are very concentrated. Espresso is also the base for other drinks such as a caffè latte, cappuccino, caffè macchiato, caffè mocha, flat white, or caffè Americano.",
    cost: 4.2,
    image:
      "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
    ratting: 4.3,
    liked: false,
    numberOfRattings: 100,
  },
  {
    id: 2,
    name: "Cappuccino",
    shortDescription: "With Foam",
    longDescription:
      "A cappuccino is an espresso-based coffee drink that originated in Italy, and is traditionally prepared with steamed milk foam. Variations of the drink involve the use of cream instead of milk, and flavoring with cinnamon or chocolate powder. It is typically smaller in volume than a caffè latte, with a thicker layer of microfoam.",
    cost: 3.5,
    image:
      "data:image/jpeg;base64,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",
    ratting: 2.1,
    liked: true,
    numberOfRattings: 100,
  },
  {
    id: 3,
    name: "Latte",
    shortDescription: "With Steamed Milk",
    longDescription:
      "Caffe latte is a coffee-based drink made primarily from espresso and steamed milk. It consists of one-third espresso, two-thirds heated milk and about 1cm of foam. Depending on the skill of the barista, the foam can be poured in such a way to create a picture. Common pictures that appear in lattes are love hearts and ferns. Latte art is an important part of the coffee culture and the barista's skill.",
    cost: 3.8,
    image:
      "https://media.istockphoto.com/id/173245886/photo/cappuccino.jpg?s=612x612&w=0&k=20&c=M622fenNX65OGemtZR0LDCq4LVvxNZJygI5Y4D4NV9g=",
    ratting: 5.0,
    liked: true,
    numberOfRattings: 100,
  },
];

// CoffeeBeanDummyData is from Home Screen
export const CoffeeBeanDummyData: CoffeeBeanType[] = [
  {
    id: 1,
    name: "Robusta Beans",
    shortDescription: "Medium Roasted",
    longDescription: "",
    cost: 3.5,
    image:
      "https://www.foodrepublic.com/img/gallery/12-rare-types-of-coffee-you-have-to-try-at-least-once/intro-1687812481.jpg",

    ratting: 3.9,
    liked: false,
    numberOfRattings: 100,
  },
  {
    id: 2,
    name: "Arabica Beans",
    shortDescription: "Light Roasted",
    longDescription: "",
    cost: 3.5,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Roasted_coffee_beans.jpg/1200px-Roasted_coffee_beans.jpg",
    ratting: 4.2,
    liked: false,
    numberOfRattings: 100,
  },
  {
    id: 3,
    name: "Liberica Beans",
    shortDescription: "Dark Roasted",
    longDescription: "",
    cost: 3.5,
    image:
      "https://espressocoffeeguide.com/wp-content/uploads/2010/05/kenyaaa-coffee-beans.jpg",
    ratting: 4.3,
    liked: true,
    numberOfRattings: 100,
  },
];

// FavouriteItem is from Favourite Screen
export const FavouriteItemDummyData: FavouriteItem[] = [
  {
    id: 1,
    imageURl:
      "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
    liked: true,
    name: "Cappuccino",
    shortDescription: "With milk",
    ratting: 4.5,
    numberOfRattings: 100,
    cost: 3.8,
    longDescription:
      "Cappuccino is a latte made with more foam than steamed milk, often with a sprinkle of cocoa powder or cinnamon on top.",
  },
  {
    id: 2,
    imageURl:
      "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
    liked: false,
    name: "Espresso",
    shortDescription: "Strong coffee",
    ratting: 4.2,
    numberOfRattings: 80,
    cost: 3.8,
    longDescription:
      "Espresso is a concentrated coffee brewed by forcing a small amount of nearly boiling water under pressure through finely-ground coffee beans.",
  },
  {
    id: 3,
    imageURl:
      "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
    liked: true,
    name: "Latte",
    shortDescription: "Creamy coffee",
    ratting: 4.7,
    numberOfRattings: 120,
    cost: 3.8,
    longDescription:
      "Latte is a coffee drink made with espresso and steamed milk. The term comes from the Italian caffè e latte, meaning 'coffee and milk'.",
  },
];

// Item for cart screen
export const CoffeeBeansCartItems: CoffeeBeanCartItemType[] = [
  {
    imageURL:
      "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
    name: "Liberica Coffee Beans",
    shortDescription: "Medium Roasted",
    longDescription: "From Africa",
    quantity_250gm: {
      price: 10,
      quantity: 3,
    },
    quantity_500gm: {
      price: 20,
      quantity: 0,
    },
    quantity_1000kg: {
      price: 30,
      quantity: 10,
    },
  },
];

export const CoffeeCartItems: CoffeeCartItemType[] = [
  {
    name: "Cappuccino",
    imageURL:
      "https://www.acouplecooks.com/wp-content/uploads/2021/05/Latte-Art-066.jpg",
    shortDescription: "With milk and sugar",
    longDescription:
      "A classic coffee drink with frothy milk and a touch of sweetness.",
    small: {
      price: 10,
      quantity: 3,
    },
    medium: {
      price: 20,
      quantity: 0,
    },
    large: {
      price: 30,
      quantity: 10,
    },
  },
];

// OrderItem is from Order History Screen
export const OrderItemDummyData: OrderItemType[] = [
  {
    id: "1",
    date: "2021-08-01",
    totalAmount: 100,
    items: [
      {
        id: "1",
        imageURL:
          "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
        title: "Item 1",
        shortDescription: "Description 1",
        largePrice: 10,
        mediumPrice: 8,
        smallPrice: 6,
        totalPrice: 20,
        product: "coffee",
        quantity: {
          small: 2,
          medium: 3,
          large: 4,
        },
      },
      {
        id: "3",
        imageURL:
          "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
        title: "Item 2",
        shortDescription: "Description 2",
        "250gPrice": 10,
        "500gPrice": 20,
        "1kgPrice": 30,
        totalPrice: 60,
        product: "coffee beans",
        quantity: {
          "250g": 2,
          "500g": 3,
          "1kg": 4,
        },
      },
    ],
  },
  {
    id: "2",
    date: "2021-08-02",
    totalAmount: 200,
    items: [
      {
        id: "3",
        imageURL:
          "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
        title: "Item 3",
        shortDescription: "Description 3",
        largePrice: 10,
        mediumPrice: 8,
        smallPrice: 6,
        totalPrice: 120,
        product: "coffee",
        quantity: {
          small: 2,
          medium: 3,
          large: 4,
        },
      },
      {
        id: "4",
        imageURL:
          "https://media.istockphoto.com/id/523168994/photo/cappuccino-with-coffee-beans.jpg?s=612x612&w=0&k=20&c=qhRFxaeTppFykANecfXx8B17JSJYNJgW2KExDrUWKCk=",
        title: "Item 4",
        shortDescription: "Description 4",
        "250gPrice": 10,
        "500gPrice": 20,
        "1kgPrice": 30,
        totalPrice: 200,
        product: "coffee beans",
        quantity: {
          "250g": 2,
          "500g": 3,
          "1kg": 4,
        },
      },
    ],
  },
];
