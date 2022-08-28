import * as Parse from 'parse';
import { QueryBuilder } from "../QueryBuilder";
import { BaseClass } from "./BaseClass";
import { Client } from "./Client";
import { Guard } from './Guard';

export enum TaskType {
    REGULAR = 'Regular',
    RAID = 'Raid',
    STATIC = 'Static',
    ALARM = 'Alarm'
}

export enum TaskEvent {
    ACCEPT = 'ACCEPT',
    ARRIVE = 'ARRIVE',
    ABORT = 'ABORT',
    FINISH = 'FINISH',
    OTHER = 'OTHER'
}

export class EventLog extends BaseClass {


    static className = 'EventLog';

    static readonly _name = 'name';
    
    static readonly _eventCode = 'eventCode';
    static readonly _taskEvent = 'task_event';
    static readonly _taskType = 'taskType';
    static readonly _taskTypeName = 'taskTypeName';

    static readonly _task = 'task';
    static readonly _taskGroupStarted = 'taskGroupStarted';

    static readonly _deviceTimestamp = 'deviceTimestamp';
    static readonly _position = 'position';

    static readonly _guard = 'guard';
    static readonly _guardName = 'guardName';

    static readonly _client = 'client';
    static readonly _clientName = 'clientName';
    static readonly _clientCity = 'clientCity';
    static readonly _clientZipcode = 'clientZipcode';
    static readonly _clientAddress = 'clientAddress';
    static readonly _clientAddressNumber = 'clientAddressNumber';
    static readonly _clientFullAddress = 'clientFullAddress';

    static readonly _event = 'event';
    static readonly _amount = 'amount';
    static readonly _people = 'people';
    static readonly _clientLocation = 'clientLocation';
    static readonly _remarks = 'remarks';

    static readonly _activityName = 'activityName';
    static readonly _distanceMeters = 'clientDistanceMeters';
    static readonly _automatic = 'automatic';
    static readonly _withinSchedule = 'withinSchedule';

    static readonly _report = 'report';


    constructor(className?: string) {
        super(className || EventLog.className);
    }

    get name(): string {
        return this.get(EventLog._name);
    }

    set name(name: string) {
        this.set(EventLog._name, name);
    }

    get taskType(): TaskType {
        return this.get(EventLog._taskType);
    }

    set taskType(taskType: TaskType) {
        this.set(EventLog._taskType, taskType);
    }

    get eventCode(): number {
        return this.get(EventLog._eventCode);
    }

    set eventCode(eventCode: number) {
        this.set(EventLog._eventCode, eventCode);
    }
    
    matchingTaskType(...taskType: TaskType[]): boolean {
        return taskType.includes(this.taskType);
    }

    get guardName(): string {
        return this.get(EventLog._guardName) || '';
    }

    set guardName(guardName: string) {
        this.set(EventLog._guardName, guardName);
    }

    get guard(): Guard {
        return this.get(EventLog._guard);
    }

    set guard(guard: Guard) {
        this.set(EventLog._guard, guard);
    }


    get activityName(): string {
        return this.get(EventLog._activityName);
    }

    get distanceToClientMeters(): number {
        return this.get(EventLog._distanceMeters);
    }

    get client(): Client {
        return this.get(EventLog._client);
    }

    set client(client: Client) {
        this.set(EventLog._client, client);

        const {name, cityName, zipCode, addressName, addressNumber} = client;
        
        this.clientName = name;
        this.clientCity = cityName;
        this.clientZipcode = zipCode;
        this.clientAddress = addressName;
        this.clientAddressNumber = addressNumber;
        this.clientFullAddress = `${addressName} ${addressNumber} ${zipCode} ${cityName}`;
    }

    get clientName(): string {
        return this.get(EventLog._clientName);
    }

    set clientName(clientName: string) {
        this.set(EventLog._clientName, clientName);
    }

    get clientCity(): string {
        return this.get(EventLog._clientCity);
    }

    set clientCity(clientCity: string) {
        this.set(EventLog._clientCity, clientCity);
    }

    get clientZipcode(): string {
        return this.get(EventLog._clientZipcode);
    }

    set clientZipcode(clientZipcode: string) {
        this.set(EventLog._clientZipcode, clientZipcode);
    }

    get clientAddress(): string {
        return this.get(EventLog._clientAddress);
    }

    set clientAddress(clientAddress: string) {
        this.set(EventLog._clientAddress, clientAddress);
    }

    get clientAddressNumber(): string {
        return this.get(EventLog._clientAddressNumber);
    }

    set clientAddressNumber(clientAddressNumber: string) {
        this.set(EventLog._clientAddressNumber, clientAddressNumber);
    }

    get clientFullAddress(): string {
        return this.get(EventLog._clientFullAddress);
    }

    set clientFullAddress(clientFullAddress: string) {
        this.set(EventLog._clientFullAddress, clientFullAddress);
    }
    
    
    get taskTypeName(): string {
        return this.get(EventLog._taskTypeName);
    }

    set taskTypeName(taskTypeName: string) {
        this.set(EventLog._taskTypeName, taskTypeName);
    }

    get taskEvent(): TaskEvent {
        return this.get(EventLog._taskEvent);
    }

    set taskEvent(taskEvent: TaskEvent) {
        this.set(EventLog._taskEvent, taskEvent);
    }

    matchingTaskEvent(...taskEvent: TaskEvent[]) {
        return taskEvent.includes(this.taskEvent);
    }

    get event(): string {
        return this.get(EventLog._event);
    }

    set event(event: string) {
        this.set(EventLog._event, event);
    }

    get people(): string {
        return this.get(EventLog._people);
    }

    set people(people: string) {
        this.set(EventLog._people, people);
    }

    get clientLocation(): string {
        return this.get(EventLog._clientLocation);
    }

    set clientLocation(clientLocation: string) {
        this.set(EventLog._clientLocation, clientLocation);
    }

    get remarks(): string {
        return this.get(EventLog._remarks);
    }

    set remarks(remarks: string) {
        this.set(EventLog._remarks, remarks);
    }


    get amount(): number {
        return this.get(EventLog._amount);
    }

    set amount(amount: number) {
        this.set(EventLog._amount, amount);
    }
    
    get automatic(): boolean {
        return this.get(EventLog._automatic);
    }

    set automatic(automatic: boolean) {
        this.set(EventLog._automatic, automatic);
    }


    get withinSchedule(): boolean {
        return this.get(EventLog._withinSchedule);
    }

    set withinSchedule(withinSchedule: boolean) {
        this.set(EventLog._withinSchedule, withinSchedule);
    }

    get deviceTimestamp(): string {
        return this.get(EventLog._deviceTimestamp);
    }

    set deviceTimestamp(deviceTimestamp: string) {
        this.set(EventLog._deviceTimestamp, deviceTimestamp);
    }

    get position(): Parse.GeoPoint {
        return this.get(EventLog._position);
    }

}

export class EventLogQuery extends QueryBuilder<EventLog> {

    constructor() {
        super(EventLog);
    }

    matchingTaskEvent(taskEvent: TaskEvent) {
        this.query.equalTo(EventLog._taskEvent, taskEvent);

        return this;
    }

    matchingGuard(guard: Guard) {
        this.query.equalTo(EventLog._guard, guard);

        return this;
    }

    matchingGuardId(objectId: string) {
        this.query.equalTo(EventLog._guard, Guard.createWithoutData(objectId));

        return this;
    }
}