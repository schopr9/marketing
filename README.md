## Agenda
1. Domain driven design and Bounded context
Nike example 
2. advantage of autonomous services - reliable, scalable and 
3. event driven archietecture 
4. Product - name, description, images, price, availability, reviews
         Sales            Inventory       Shipping
         Product          Product         Product
         <- weight                        weight - > Shipping weight -> don't loose business translations
          display weight 
          description     availability    shipping options
          images                          Dimensions
          price
          dimensions
          Bounded context - safe space ( models in that space can eveolve freely and are consistent with domain ) , provides clarity
          How do you identify the context? would i need to update description and availability in same transaction if not then different context (key point transactional consistency)
           - communication between contexts is implemented throught event driven arch
           - events gets published -> subscribed by different contexts

5. Requirement - when an aircraft type is changed -> notify passenger -> passenger can cancel the flight -> passenger can accept proposed booking
    flight planning context       --- aircraft type has changed --->     booking context
                                                                            rebook flight
                                                                            notify customer
                                                                            booking was cancelled

    schema of events is important!!! 

    Saga pattern - allows multiple events to take part in business process  (state immutable - create new state same as redux pure functions) maintain the state -> finite state machine
      event stream
       event1 ->  cancel the booking 
       event2 -> notify customer
       event3 -> rebook flight  this will not get executed as the flight is cancelled (state machines)

    Eventstorming - aircraft type has changed | booked flight was changed |  booking was cancelled
                      rebook flight           | notify customer           |    
                    flight planning context   | booking context                                   |

     Naming is hard 👍 for events
      - should mean to business
      - NEW_BOOKING_PROPOSAL or REBOOK_FLIGHT
      - all models are wrong but some are useful - some george guy
      - handleAircraftTypeHasChanged or proposeNewRebookingWhenAircraftChanged
      - BookingChangePolicy or GracePeriodForAcceptingRebooking
      - events are immutable - readonly property
  
  Requirement - > only applies to platinum cast passengers
      Booking context    -- get loyality status -->              loyality context
        propose booking                                            promote customer        
        lets say loyality context is down

      Temporal coupling ( based on business decisions )
       look at data what it has to make decision   


2. https://www.eventstore.com/
3. 