import { Injectable } from '@angular/core';
import { Central } from './src/lib/subclass/Central';
import { Client } from './src/lib/subclass/Client';
import { ClientContact } from './src/lib/subclass/ClientContact';
import { Guard } from './src/lib/subclass/Guard';
import { Person } from './src/lib/subclass/Person';
import { Tracker } from './src/lib/subclass/Tracker';
import { User } from './src/lib/subclass/User';
import { EventType } from './src/lib/subclass/EventType';
import * as Parse from 'parse';

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
