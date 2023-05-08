import { EventInterface } from "../components/event/EventCard";
import { TicketInterface } from "../components/mytickets/ticketInfo/TicketInfo";

export declare global {
  namespace ReactNavigation {
    interface RootParamList {
      //HOME PAGE
      home: undefined;
      eventDetails: {
        event: EventInterface;
      };

      //SEARCH PAGE
      search: undefined;
      searchEventDetails: {
        event: EventInterface;
      };

      //CART PAGE
      cart: undefined;

      //PROFILE PAGE SIGNED USER
      profile: undefined;
      profileInfo: undefined;
      myTickets: undefined;
      ticketInfo: {
        ticket: TicketInterface;
      };
      transferTicket: {
        ticket: TicketInterface;
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
    event: EventInterface;
  };
  ticketInfo: {
    ticket: TicketInterface;
  };
  transferTicket: {
    ticket: TicketInterface;
  };
};
