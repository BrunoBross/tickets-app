export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      //HOME PAGE
      home: undefined;
      eventDetails: {
        eventId: string;
      };

      //SEARCH PAGE
      search: undefined;

      //CART PAGE
      cart: undefined;

      //PROFILE PAGE SIGNED USER
      profile: undefined;
      profileInfo: undefined;
      myTickets: undefined;
      ticketInfo: {
        ticketId: string;
      };
      transferTicket: {
        ticketId: string;
      };
      who: undefined;
      help: undefined;

      //PROFILE PAGE NOT SIGNED USER
      login: undefined;
      register: undefined;
    }
  }
}

export type ParamList = {
  eventDetails: {
    eventId: string;
  };
  ticketInfo: {
    ticketId: string;
  };
  transferTicket: {
    ticketId: string;
  };
};
