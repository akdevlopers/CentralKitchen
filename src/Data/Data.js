const users = {
  data: [
    {
      id: 1,
      name: "John Doe",
      email: "test@gmail.com",
      password: "12345678",
      phone: "9791886846",
      stockin: [
        {
          brand: "KFC",
          item: "Classic Chicken Burger",
          qty: 5,
          date: "11/03/25, 12:59 AM"
        },
        {
          brand: "KFC",
          item: "Classic Chicken Cheese Burger",
          qty: 14,
          date: "11/03/25, 12:59 AM"
        }
      ],
      stockout: [
        {
          school: "St. Mary Goretti Hr Sec School",
          location: "Manalikarai, Nagercoil",
          qty: 45,
          date: "11/03/25, 12:59 AM",
          status: "Delivered"
        },
        {
          school: "St. Mary Goretti Hr Sec School",
          location: "Manalikarai, Nagercoil",
          qty: 45,
          date: "11/03/25, 12:59 AM",
          status: "Delivered"
        }
      ]
    },
    {
      id: 2,
      name: "Jerald Jcob",
      email: "sample@gmail.com",
      password: "87654321",
      phone: "9791886846",
      stockin: [
        {
          brand: "McDonald's",
          item: "Classic Chicken Burger",
          qty: 2,
          date: "11/03/25, 12:59 AM"
        }
      ],
      stockout: [
        {
          school: "St. Mary Goretti Hr Sec School",
          location: "Manalikarai, Nagercoil",
          qty: 45,
          date: "11/03/25, 12:59 AM",
          status: "Delivered"
        },
        {
          school: "St. Mary Goretti Hr Sec School",
          location: "Manalikarai, Nagercoil",
          qty: 45,
          date: "11/03/25, 12:59 AM",
          status: "Delivered"
        }
      ]
    },
  ],
};

const vendarData = {
  data: [
    {
      id: 1,
      vendorName: "KFC",
      itemName: "Classic Chicken Burger",
      quantity: 5,
      date: "11/03/25, 12:59 AM",
      logo: "../../public/assets/image.png",
    },
    {
      id: 2,
      vendorName: "KFC",
      itemName: "Classic Chicken Cheese Burger",
      quantity: 14,
      date: "11/03/25, 12:59 AM",
      logo: "../../public/assets/image.png",
    },
    {
      id: 3,
      vendorName: "McDonald's",
      itemName: "Classic Chicken Burger",
      quantity: 2,
      date: "11/03/25, 12:59 AM",
      logo: "mcd.png",
    },
    {
      id: 4,
      vendorName: "McDonald's",
      itemName: "French Fries",
      quantity: 34,
      date: "11/03/25, 12:59 AM",
      logo: "mcd.png",
    },
    {
      id: 5,
      vendorName: "Pizza Hut",
      itemName: "7inch Veg Pizza",
      quantity: 34,
      date: "11/03/25, 12:59 AM",
      logo: "pizzahut.png",
    },
    {
      id: 6,
      vendorName: "Pizza Hut",
      itemName: "7inch Chicken Pizza",
      quantity: 34,
      date: "11/03/25, 12:59 AM",
      logo: "pizzahut.png",
    },
    {
      id: 7,
      vendorName: "KFC",
      itemName: "Classic Chicken Burger",
      quantity: 5,
      date: "11/03/25, 12:59 AM",
      logo: "../../public/assets/image.png",
    },
    {
      id: 8,
      vendorName: "KFC",
      itemName: "Classic Chicken Cheese Burger",
      quantity: 14,
      date: "11/03/25, 12:59 AM",
      logo: "../../public/assets/image.png",
    },
    {
      id: 9,
      vendorName: "McDonald's",
      itemName: "Classic Chicken Burger",
      quantity: 2,
      date: "11/03/25, 12:59 AM",
      logo: "mcd.png",
    },
    {
      id: 10,
      vendorName: "McDonald's",
      itemName: "French Fries",
      quantity: 34,
      date: "11/03/25, 12:59 AM",
      logo: "mcd.png",
    },
    {
      id: 11,
      vendorName: "Pizza Hut",
      itemName: "7inch Veg Pizza",
      quantity: 34,
      date: "11/03/25, 12:59 AM",
      logo: "pizzahut.png",
    },
    {
      id: 12,
      vendorName: "Pizza Hut",
      itemName: "7inch Chicken Pizza",
      quantity: 34,
      date: "11/03/25, 12:59 AM",
      logo: "pizzahut.png",
    },
  ],
};

const Instritutions = {
  data: [
    {
      id: 1,
      schoolName: "St. Mary Goretti Hr Sec School",
      location: "Manalikarai, Nagercoil.",
      quantity: "45 Qty",
      status: "Delivered",
      todayOrder: true,
      todaysOrder: [
        {
          brand: "KFC",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "McDonald's",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        },
        {
          brand: "Burger King",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        }
      ]
    },
    {
      id: 2,
      schoolName: "Infant Jesus School",
      location: "Nagercoil.",
      quantity: "32 Qty",
      status: "Pending",
      todayOrder: true,
      todaysOrder: [
        {
          brand: "KFC",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "McDonald's",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        },
        {
          brand: "Burger King",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        }
      ]
    },
    {
      id: 3,
      schoolName: "Holy Cross School",
      location: "Nagercoil.",
      quantity: "50 Qty",
      status: "Delivered",
      todayOrder: true,
      todaysOrder: [
        {
          brand: "KFC",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "McDonald's",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        },
        {
          brand: "Burger King",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        }
      ]
    },
    {
      id: 4,
      schoolName: "St. Xavier's Matriculation School",
      location: "Kottar, Nagercoil.",
      quantity: "60 Qty",
      status: "Delivered",
      todayOrder: true,
      todaysOrder: [
        {
          brand: "KFC",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "McDonald's",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        },
        {
          brand: "Burger King",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        }
      ]
    },
    {
      id: 5,
      schoolName: "Carmel Higher Sec School",
      location: "Marthandam, Nagercoil.",
      quantity: "40 Qty",
      status: "Pending",
      todayOrder: true,
      todaysOrder: [
        {
          brand: "KFC",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "McDonald's",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        },
        {
          brand: "Burger King",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        }
      ]
    },
    {
      id: 6,
      schoolName: "Don Bosco School",
      location: "Nagercoil.",
      quantity: "52 Qty",
      status: "Delivered",
      todayOrder: true,
      todaysOrder: [
        {
          brand: "KFC",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "McDonald's",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        },
        {
          brand: "Burger King",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        }
      ]
    },
    {
      id: 7,
      schoolName: "Nirmala Matriculation School",
      location: "Colachel, Nagercoil.",
      quantity: "39 Qty",
      status: "Delivered",
      todayOrder: true,
      todaysOrder: [
        {
          brand: "KFC",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "McDonald's",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        },
        {
          brand: "Burger King",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        }
      ]
    },
    {
      id: 8,
      schoolName: "Christ Nagar School",
      location: "Nagercoil.",
      quantity: "41 Qty",
      status: "Pending",
      todayOrder: true,
      todaysOrder: [
        {
          brand: "KFC",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "McDonald's",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        },
        {
          brand: "Burger King",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        }
      ]
    },
    {
      id: 9,
      schoolName: "Good Shepherd School",
      location: "Thuckalay, Nagercoil.",
      quantity: "49 Qty",
      status: "Delivered",
      todayOrder: true,
      todaysOrder: [
        {
          brand: "KFC",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "McDonald's",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        },
        {
          brand: "Burger King",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        }
      ]
    },
    {
      id: 10,
      schoolName: "Holy Angel School",
      location: "Nagercoil.",
      quantity: "47 Qty",
      status: "Pending",
      todayOrder: true,
      todaysOrder: [
        {
          brand: "KFC",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "McDonald's",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Delivered"
        },
        {
          brand: "Pizza Hut",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        },
        {
          brand: "Burger King",
          item: "Classic Chicken Burger",
          location: "KFC - SP Plaza Mall",
          status: "Pending"
        }
      ]
    },
  ]
}

const CommissionData = {
  data: [
    {
      id: 1,
      school: "St. Mary Goretti Hr Sec School",
      location: "Manalikarai, Nagercoil",
      date_time: "11/03/25, 12:59 AM",
      amount: "RM50",
      order: [
        {
          id: 1,
          image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/KFC-Logo.svg',
          name: 'Classic Chicken Burger',
          location: 'KFC - SP Plaza Mall',
          status: 'Delivered',
        },
        {
          id: 2,
          image: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/McDonald%27s_Logo.svg',
          name: 'Classic Chicken Burger',
          location: 'KFC - SP Plaza Mall',
          status: 'Delivered',
        },
        {
          id: 3,
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Pizza_Hut_logo.svg',
          name: 'Classic Chicken Burger',
          location: 'KFC - SP Plaza Mall',
          status: 'Delivered',
        },
        {
          id: 4,
          image: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Pizza_Hut_logo.svg',
          name: 'Classic Chicken Burger',
          location: 'KFC - SP Plaza Mall',
          status: 'Delivered',
        },
        {
          id: 5,
          image: 'https://upload.wikimedia.org/wikipedia/commons/2/29/Burger_King_2020.svg',
          name: 'Classic Chicken Burger',
          location: 'KFC - SP Plaza Mall',
          status: 'Delivered',
        },
      ],
    },
    {
      id: 2,
      school: "St. Mary Goretti Hr Sec School",
      location: "Manalikarai, Nagercoil",
      date_time: "11/03/25, 12:59 AM",
      amount: "RM50",
      order: [ /* same order with id 1-5 */],
    },
    {
      id: 3,
      school: "St. Mary Goretti Hr Sec School",
      location: "Manalikarai, Nagercoil",
      date_time: "11/03/25, 12:59 AM",
      amount: "RM50",
      order: [ /* same order with id 1-5 */],
    },
    {
      id: 4,
      school: "St. Mary Goretti Hr Sec School",
      location: "Manalikarai, Nagercoil",
      date_time: "11/03/25, 12:59 AM",
      amount: "RM50",
      order: [ /* same order with id 1-5 */],
    },
    {
      id: 5,
      school: "St. Mary Goretti Hr Sec School",
      location: "Manalikarai, Nagercoil",
      date_time: "11/03/25, 12:59 AM",
      amount: "RM50",
      order: [ /* same order with id 1-5 */],
    },
    {
      id: 6,
      school: "St. Mary Goretti Hr Sec School",
      location: "Manalikarai, Nagercoil",
      date_time: "11/03/25, 12:59 AM",
      amount: "RM50",
      order: [ /* same order with id 1-5 */],
    },
    {
      id: 7,
      school: "St. Mary Goretti Hr Sec School",
      location: "Manalikarai, Nagercoil",
      date_time: "11/03/25, 12:59 AM",
      amount: "RM50",
      order: [ /* same order with id 1-5 */],
    },
  ]


}


export { users, vendarData, Instritutions, CommissionData };
