import { Injectable } from '@angular/core';
import * as Parse from 'parse';
import { Central, Client, ClientContact, EventType, Guard, Person, EventLog, Tracker, User } from './src/lib/subclass';

@Injectable({
  providedIn: 'root'
})
export class RegisterSubclassesService {

  public register() {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const subclasses: Record<string, any> = {
            [User.className]: User,
            [Guard.className]: Guard,
            [Client.className]: Client,
            [EventLog.className]: EventLog,
            [EventType.className]: EventType,
            [Central.className]: Central,
            [Person.className]: Person,
            [ClientContact.className]: ClientContact,
            [Tracker.className]: Tracker,
        };
  
  
        Object.keys(subclasses).forEach((name) => {
            console.log('register', name);
            Parse.Object.registerSubclass(name, subclasses[name]);
        });
  }
}
