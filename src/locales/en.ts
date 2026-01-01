const en = {
  brand: 'Payurus',
  common: {
    profile: 'Profile',
    menu: 'Menu',
    messages: 'Messages',
    learn: 'Learn',
    moreOptions: 'More options',
    home: 'Home',
    card: 'Card',
    send: 'Send',
    hub: 'Hub',
  },
  depositOptions: {
    title: 'Deposit via bank / credit card',
    description:
      'Add money instantly from your linked bank or credit card. Standing instructions are coming soon.',
    options: {
      bankTransfer: 'Bank transfer',
      depositNow: 'Deposit now',
      createInstruction: 'Set up deposit instruction',
      myInstructions: 'My deposit instructions',
    },
  },
  ownIbanDeposit: {
    title: 'Deposit to your own IBAN',
    description:
      'Use your Payurus IBAN or Easy Address to send money anytime. Share these details if someone else is depositing for you.',
    infoTitles: {
      accountHolder: 'Account holder',
      iban: 'Payurus IBAN',
      remainingLimit: 'Remaining limit',
      easyAddress: 'Easy address',
    },
    limitNote:
      'You can deposit up to 100,000₺ per transaction. Split larger amounts into multiple transfers.',
    howItWorksCta: 'How do I deposit?',
  },
  withdrawDepositHub: {
    title: 'Withdraw / Deposit',
    tabs: {
      withdraw: 'Withdraw',
      deposit: 'Deposit',
    },
    actions: {
      ownIban: {
        title: 'Deposit with your own IBAN',
        description: 'Send money from any bank account to your Payurus IBAN or Easy Address 24/7.',
      },
      atmQr: {
        title: 'Deposit via ATM QR',
        description: 'Scan the QR on the ATM screen to add cash without using your card.',
        badge: 'NEW',
      },
      bankCard: {
        title: 'Deposit with bank / credit card',
        description: 'Use a saved bank or credit card—or add a new one—to fund your account.',
      },
      eft: {
        title: 'Deposit via bank transfer (EFT)',
        description: 'Transfer to Payurus’ settlement account using your Payurus number.',
      },
      cardless: {
        title: 'Deposit cash without a card',
        description: 'Find the closest ATM and deposit cash using the cardless options.',
      },
      paparaCard: {
        title: 'Deposit with Payurus Card at ATM',
        description: 'Insert your Payurus Card at partner ATMs to add money instantly.',
      },
    },
  },
  bankTransfer: {
    title: 'Choose bank',
    subtitle: 'Banks that usually complete the transfer within 5–15 minutes.',
    nearestAtm: 'Nearest ATM',
    badgeInstant: 'Instant',
    ibanLabel: 'Your Payurus IBAN',
    banks: {
      garanti: 'Garanti',
      qnb: 'QNB',
      yapiKredi: 'Yapı Kredi',
      isbank: 'İş Bankası',
      vakif: 'Vakıflar Bankası',
      ziraat: 'Ziraat Bankası',
      ptt: 'PTT',
      turkiyeFinans: 'Türkiye Finans Katılım',
      albaraka: 'Albaraka Türk Bankası',
      odeabank: 'Odeabank',
    },
  },
  accountDetails: {
    title: 'Account details',
    accountType: 'Account type',
    verified: 'Verified account',
    payurusNumber: 'Payurus number',
    iban: 'IBAN',
    totalBalance: 'Total balance',
    availableBalance: 'Available balance',
    cashBalance: 'Cash balance',
    incomingLimit: 'Monthly incoming limit',
    remainingIncomingLimit: 'Remaining incoming limit',
    differentSenderTransfer: 'Transfers from different senders',
    incomingTransferCount: 'Incoming transfer count',
    incomingTransferAmount: 'Incoming transfer total',
    cashWithdrawLimit: 'ATM cash withdraw limit',
    cashDepositLimit: 'Cash deposit limit',
    remainingCashDepositLimit: 'Remaining cash deposit limit',
    internationalLimit: 'International transfer limit',
    remainingInternationalLimit: 'Remaining international limit',
    description: {
      payurusNumber: 'Share this number for wallet transfers.',
      iban: 'Use for bank transfers.',
      totalBalance: 'Total TL balance across your accounts.',
      availableBalance: 'Funds you can currently use.',
      cashBalance: 'Balance eligible for cash withdrawal.',
      incomingLimit: 'Monthly incoming transfer total limit.',
      remainingIncomingLimit: 'Remaining portion of your incoming limit this month.',
      cashWithdrawLimit: 'Monthly maximum you can withdraw at ATMs.',
      cashDepositLimit: 'Monthly maximum you can deposit.',
      remainingCashDepositLimit: 'Remaining deposit capacity this month.',
      differentSenderTransfer: 'Unique people who sent you money this month.',
      incomingTransferCount: 'Number of incoming transfers this month.',
      incomingTransferAmount: 'Total amount received this month.',
      internationalLimit: 'Monthly international send limit.',
      remainingInternationalLimit: 'Remaining international transfer capacity.',
    },
    legal: {
      userAgreement: 'User agreement',
      privacy: 'Privacy notice',
    },
    updatePhoto: 'Update',
  },
  auth: {
    hero: {
      title: '$5 spending credit on us',
      subtitle: 'Where crypto meets real life',
    },
    actions: {
      signup: 'Sign up',
      login: 'Log in',
    },
    learnCard: {
      title: 'Refer friends, get rewards',
      readTime: '3 min read',
    },
  },
  paymentsHub: {
    title: 'Payments',
    summaryLabel: 'Summary',
    searchPlaceholder: 'Search services',
    summaryModal: {
      title: 'Monthly spend overview',
      description: 'See how much each service category consumed this month.',
      totalLabel: 'Total',
      cta: 'Got it',
      categories: {
        transit: 'Transit cards',
        gaming: 'Games & digital codes',
        donation: 'Donations',
        findeks: 'Findeks',
        telecom: 'GSM TL / Bundles',
        airport: 'Airport services',
      },
    },
    promo: {
      title: 'Insurance',
      description: 'Manage Payurus insurance from its own portal.',
      badge: '5% Cashback',
      cta: 'Explore',
    },
    categories: {
      gsm: 'Mobile top-up & bundles',
      transit: 'Transit cards',
      gaming: 'Games & digital codes',
      lottery: 'Lottery & sweepstakes',
      donation: 'Donations',
      findeks: 'Findeks',
      airport: 'Airport services',
      water: 'Water',
      phone: 'Phone',
      electricity: 'Electricity',
      internet: 'Internet & TV',
      gas: 'Natural gas',
      gift: 'Gift cards',
    },
    badges: {
      new: 'New',
    },
  },
  bankAccounts: {
    title: 'Bank accounts',
    subtitle:
      'Link your own bank accounts to withdraw Payurus balance anytime. You can add new accounts or review the ones already connected.',
    cta: 'Add account',
    labels: {
      iban: 'IBAN',
    },
  },
  feesLimits: {
    title: 'Fees & limits',
    tabs: {
      fees: 'Transaction fees',
      limits: 'Account limits',
    },
    sections: {
      balance: 'Balance limit',
      incomingTotal: 'Incoming total limit',
      cashDeposit: 'Cash deposit limit',
      atmWithdraw: 'ATM withdraw limit',
      purchaseCount: 'Purchase count limit',
      purchaseAmount: 'Purchase amount limit',
      ibanSendCount: 'IBAN send count limit',
      ibanSendAmount: 'IBAN send amount limit',
      intlSendAmount: 'International send limit',
      requestCount: 'Request money count limit',
      cardPayCount: 'Card payment count limit',
      cardPayAmount: 'Card payment amount limit',
      merchantPayCount: 'Merchant payment count limit',
      merchantPayAmount: 'Merchant payment amount limit',
      allowanceSend: 'Allowance send limit',
    },
    subtitle:
      'Review how much you can keep in Payurus, how much you can move, and any charges that apply.',
    valueLabels: {
      perDay: 'Per day',
      perMonth: 'Per month',
      perYear: 'Per year',
      perTransaction: 'Per transaction',
      unlimited: 'Unlimited',
    },
  },
  monthlySummary: {
    title: 'Monthly summary',
    monthLabel: 'Month',
    download: 'Download',
    tabs: {
      overview: 'Overview',
      card: 'Payurus Card',
      cashback: 'Cashback',
      transfers: 'Transfers',
    },
    incomingTitle: 'Incoming',
    outgoingTitle: 'Outgoing',
    ctas: {
      request: 'Request money',
      deposit: 'Deposit',
      cashback: 'Earn cashback',
      payBill: 'Pay bills',
    },
    emptyMessage: 'No transactions recorded for this category.',
    timeline: {
      incoming: {
        totalDescription: '₺20,000.00 entered your account this month.',
        selfDepositTitle: 'Amount you deposited',
        selfDepositDescription: 'Total you added from your own bank accounts.',
        requestTitle: 'Request money',
        requestDescription: 'Ask anyone for funds anytime for free.',
        cardCashbackTitle: 'Payurus Card cashback',
        cardCashbackDescription: 'Earn instant cashback on every spend.',
        noPaymentsTitle: 'No payments',
        noPaymentsDescription: 'No payments were received this month.',
      },
      outgoing: {
        totalDescription: '₺20,000.00 left your account this month.',
        billsTitle: 'Bill payments',
        billsDescription: 'Track your bills and payments inside the Payments hub.',
        transfersTitle: 'Money transfers',
        transfersDescription: 'Review the amounts you sent to friends here.',
      },
    },
  },
  cardPromo: {
    title: 'Akbank ATMs are always free.',
    body: 'Withdraw or deposit with Payurus Card at any ATM. Akbank ATMs are completely free for cash-in and cash-out.',
    cards: {
      gray: 'Gray',
      black: 'Black',
      edu: 'Edu',
    },
    ctas: {
      findAtm: 'Find an ATM',
      apply: 'Request Payurus Card',
    },
  },
  cardHub: {
    title: 'Payurus Card',
    subtitle: 'Manage all your cards in one place.',
    cta: {
      newCard: 'New Card',
    },
    sections: {
      virtualCard: {
        title: 'Virtual Card',
        subtitle: 'Your online payments card',
        number: '•••• 8234',
      },
      digitalSlip: {
        title: 'Digital Slip',
        subtitle: 'Go paperless, help the planet',
      },
      spendSummary: {
        title: 'Spend Summary',
        subtitle: 'Track every category with ease',
      },
      subscriptions: {
        title: 'Subscriptions',
        subtitle: 'Stay in control of recurring payments',
      },
      roundUp: {
        title: 'Round Up',
        subtitle: 'Save or donate your spare change',
      },
    },
  },
  virtualCard: {
    title: 'Virtual Card',
    subtitle: 'Control your online spending card.',
    info: 'You have not made any purchases with this card yet.',
    toggleLabel: 'Usage enabled',
    toggleStates: {
      on: 'Card is ready for purchases',
      off: 'Card is paused',
    },
    limitSummary: 'Monthly limit {limit} / Remaining {remaining}',
    actions: {
      limits: {
        title: 'Limit Settings',
        subtitle: 'Update monthly or per-transaction limits',
      },
      subscriptions: {
        title: 'Subscriptions',
        subtitle: 'Manage recurring charges using this card',
      },
      masterpass: {
        title: 'Masterpass Settings',
        subtitle: 'Pay quickly without re-entering card info',
      },
      rename: {
        title: 'Rename Virtual Card',
        subtitle: 'Current name: {name}',
      },
      cancel: {
        title: 'Cancel Card',
        subtitle: 'Deactivate this virtual card',
      },
    },
  },
  pwa: {
    remoteConfig: {
      title: 'Payurus is reconnecting',
      body: 'We are using the last saved settings while we reach the new domain. You can keep using the app safely.',
      dismiss: 'Hide',
    },
    update: {
      title: 'New Payurus version is ready',
      body: 'Refresh to load the latest security updates and features.',
      refresh: 'Refresh now',
      later: 'Later',
    },
    offlineReady: {
      title: 'Offline ready',
      body: 'Payurus saved the latest shell. You can keep browsing without internet.',
      dismiss: 'Got it',
    },
    offlineBanner: 'You are offline • Changes sync automatically when connection returns',
  },
  notifications: {
    prompt: {
      title: 'Stay updated with Payurus',
      body: 'Enable push notifications to receive transfer alerts, security prompts, and cashback updates instantly.',
      enable: 'Enable notifications',
      dismiss: 'Maybe later',
      successTitle: 'Notifications enabled',
      successBody: 'We will keep you posted about transfers, approvals, and new rewards.',
      manage: 'Manage settings',
      deniedTitle: 'Notifications blocked',
      deniedBody:
        'Notifications are disabled by your browser. Enable them in site settings to receive alerts.',
    },
  },
  settings: {
    title: 'Settings',
    sections: {
      account: 'Account settings',
      app: 'Application settings',
    },
    badges: {
      new: 'New',
      beta: 'Beta',
    },
    items: {
      changePassword: {
        title: 'Change password',
        subtitle: 'Update your Payurus password anytime.',
      },
      personalInfo: {
        title: 'Personal information',
        subtitle: 'Edit your profile and legal details.',
      },
      cardSettings: {
        title: 'Card settings',
        subtitle: 'Control card limits and security.',
      },
      privacy: {
        title: 'Privacy preferences',
        subtitle: 'Choose who can see your activity.',
      },
      chat: {
        title: 'Chat settings',
        subtitle: 'Manage conversation preferences.',
      },
      lowBalance: {
        title: 'Low balance alerts',
        subtitle: 'Get notified when funds drop.',
      },
      activeDevices: {
        title: 'Active devices',
        subtitle: 'Review and sign out devices.',
      },
      loginOptions: {
        title: 'Login options',
        subtitle: 'Connect social or biometric logins.',
      },
      communication: {
        title: 'Communication & data',
        subtitle: 'Manage campaign updates and privacy.',
      },
      appearance: {
        title: 'Appearance',
        subtitle: 'Switch theme and accent colors.',
      },
      stealth: {
        title: 'Stealth mode',
        subtitle: 'Hide balances on sensitive screens.',
      },
      language: {
        title: 'App language',
        subtitle: 'Change your preferred language.',
      },
      closeAccount: {
        title: 'Close account',
        subtitle: 'Permanently close your Payurus account.',
      },
      notifications: {
        title: 'Notifications',
        subtitle: 'Choose which alerts reach you.',
      },
    },
  },
  mainLayout: {
    shortcuts: {
      sticker: 'Sticker Card',
      guardian: 'Guardian Card',
      lottery: 'Chance promo',
      invest: 'Investment',
      gold: 'Gold gift',
    },
    bottomNav: {
      home: 'Home',
      qr: 'QR',
      transfer: 'Transfers',
      payments: 'Payments',
      card: 'Card',
    },
    header: {
      payurusNo: 'Payurus No: •••• {last4}',
    },
  },
  menu: {
    title: 'Quick actions',
    cancel: 'Dismiss',
    options: {
      notifications: 'Notifications',
      findAtm: 'Find ATM',
      withdrawDeposit: 'Withdraw / Deposit',
      splitExpense: 'Split expense',
      edu: 'Payurus Edu',
      cashback: 'Cashback',
      monthlySummary: 'Monthly summary',
      fees: 'Fees & limits',
      business: 'Business account',
      faq: 'FAQ',
      support: 'Support center',
    },
  },
  profileSheet: {
    title: 'Account actions',
    cancel: 'Dismiss',
    options: {
      progress: 'A better Payurus experience',
      avatar: 'Choose profile photo',
      details: 'Account details',
      activity: 'Account activity',
      bankAccounts: 'Bank accounts',
      cards: 'Bank / credit cards',
      easyAddress: 'Manage easy addresses',
      settings: 'Settings',
      logout: 'Secure logout',
    },
  },
  dashboard: {
    notification: {
      time: 'Today 06:00',
      title: 'Your monthly account summary is ready.',
      description: 'Tap to review what happened in September.',
    },
    experience: {
      label: 'A better Payurus experience',
      progress: '2 / 5',
      shortcuts: {
        deposit: { title: 'Add money', subtitle: 'to your account' },
        card: { title: 'Payurus Card', subtitle: 'Request' },
        profile: { title: 'Profile', subtitle: 'Settings' },
      },
    },
    history: {
      title: 'Account activity',
      viewAll: 'View all',
      entries: {
        outgoingLabel: 'FAST transfer',
        incomingLabel: 'FAST transfer',
        outgoingSource: 'Acme Holdings',
        incomingSource: 'Garanti BBVA',
        outgoingDate: '14 September 2025 20:14',
        incomingDate: '14 September 2025 20:12',
      },
    },
    cashback: {
      label: 'Cashback campaigns',
      hint: 'Swipe',
      badge: 'Cash Back',
      months: {
        october: 'October',
        november: 'November',
      },
      subtitles: {
        autumn: 'instant cash rewards',
        winter: 'shop more, earn more',
      },
    },
    accountCard: {
      ibanButton: 'IBAN',
      primaryAction: 'Deposit / Withdraw',
      secondaryAction: 'Send',
      ibanLabel: 'IBAN:',
    },
    accountCardNames: {
      try: 'Turkish Lira account',
      usd: 'USD account',
      usdPersonal: 'USD personal',
    },
    transferModal: {
      title: 'Which transfer do you need?',
      options: {
        send: {
          title: 'Send money',
          description: 'Wallet-to-wallet transfer inside Payurus',
        },
        request: {
          title: 'Request money',
          description: 'Ask friends or clients to send you funds',
        },
        international: {
          title: 'International transfer',
          description: 'Wire money abroad with FX conversion',
        },
        secure: {
          title: 'Secure payment',
          description: 'Escrow-style payments for marketplaces',
        },
        scheduled: {
          title: 'Scheduled transfer',
          description: 'Set automated recurring transfers',
        },
      },
    },
    qrModal: {
      title: 'QR actions',
      actions: {
        pay: 'Pay with QR',
        receive: 'Receive with QR',
        withdraw: 'Withdraw cash via QR',
        deposit: 'Deposit cash via QR',
      },
      cancel: 'Cancel',
    },
  },
  transfers: {
    send: {
      title: 'Send money',
      info: 'Need help?',
      tabs: {
        phone: 'Phone number',
        iban: 'Payurus ID / IBAN',
      },
      contactPermission: {
        title: 'Contacts permission',
        body: 'Allow Payurus to access your address book so you can pick people faster.',
        action: 'Grant permission',
        link: 'Tap to give permission',
      },
      quickLinks: 'Quick shortcuts',
      addNew: 'Add new',
      ibanToggle: {
        iban: 'Payurus ID / IBAN',
        easy: 'Easy address',
      },
      phonePlaceholder: 'Enter phone number',
      ibanPlaceholder: 'Enter Payurus number or IBAN',
      easyPlaceholder: 'Enter easy address',
      continue: 'Continue',
    },
    request: {
      title: 'Request money',
      subtitle: 'Generate a link or QR to request funds from friends.',
      shareLink: 'Share request link',
      copyLink: 'Copy request link',
    },
    international: {
      title: 'International transfer',
      subtitle: 'Send funds abroad with competitive FX rates.',
      action: 'Start transfer',
    },
    secure: {
      title: 'Secure payment',
      subtitle: 'Protected escrow-style payments for online marketplaces.',
      action: 'Create secure payment',
    },
    scheduled: {
      title: 'Scheduled transfer',
      subtitle: 'Automate recurring transfers with reminders.',
      action: 'Set schedule',
    },
    qr: {
      pay: 'Pay with QR',
      receive: 'Receive with QR',
      withdraw: 'ATM cash withdraw via QR',
      deposit: 'ATM cash deposit via QR',
    },
  },
}

export default en
