import { BaseClass } from './subclass/BaseClass';
import * as Parse from 'parse';

export abstract class QueryBuilder<T extends BaseClass> {

    protected query: Parse.Query<T>;


    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    protected constructor(object: new(...args: any[]) => T, includeArchived?: boolean) {
        this.query = new Parse.Query(object);

        if (!includeArchived) {
            this.query.notEqualTo(BaseClass._archive, true as any);
        }
    }

    include(...includes: Array<keyof T>) {
        includes.forEach((include) => {
            this.query.include(include as string)
        });

        return this;
    }

    matchingId(id: string) {
        if (id) {
            this.query.equalTo(BaseClass._objectId, id as any);
        }

        return this;
    }

    matchingOwner(user: Parse.User) {
        this.query.equalTo(BaseClass._owner, user as any);

        return this;
    }

    createdBefore(date: Date) {
        if (date) {
            this.query.lessThan(BaseClass._createdAt, date as any);
        }

        return this;
    }

    createdAfter(date: Date) {
        if (date) {
            this.query.greaterThan(BaseClass._createdAt, date as any);
        }

        return this;
    }

    createdAfterObject(object: Parse.Object) {
        if (object && object.createdAt) {
            this.query.greaterThan(BaseClass._createdAt, object.createdAt as any);
        } else {
            console.error('createdAfterObject called with non parse object', object);
        }

        return this;
    }

    doesNotExist(key: keyof T) {
        this.query.doesNotExist(key as string);

        return this;
    }

    greaterThan(key: keyof T, date: Date) {
        this.query.greaterThan(key as string, date as any);

        return this;
    }

    lessThan(key: keyof T, date: Date) {
        this.query.lessThan(key as string, date as any);

        return this;
    }


    build(): Parse.Query<T> {
        return this.query;
    }
}