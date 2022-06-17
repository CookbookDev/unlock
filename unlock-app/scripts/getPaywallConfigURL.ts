const paywallConfig = {
  title: 'Bakery.fyi',
  locks: {
    '0xff6e45FdE991cf534d0253e241743cf4238b21D9': {
      name: 'Basic',
      network: 4,
    },
    '0x582eCeFA60c350d82EAf169df0035f3DDaCC795D': {
      name: 'Premium',
      network: 4,
    },
    '0xCE62D71c768aeD7EA034c72a1bc4CF58830D9894': {
      network: 100,
      name: 'Outer world',
    },
  },
  messageToSign:
    'You agree to our terms and conditions listed at: https://example.com/tos',
  icon: 'https://i.ibb.co/sQkJxhb/Ellipse-56.png',
  callToAction: {},
  metadataInputs: [
    {
      name: 'Email',
      type: 'email',
      required: true,
      public: false,
    },
    {
      name: 'Name',
      type: 'text',
      required: true,
    },
  ],
  pessimistic: true,
  captcha: true,
}

console.log(
  `http://localhost:3000/alpha/checkout?paywallConfig=${encodeURI(
    JSON.stringify(paywallConfig)
  )}`
)
