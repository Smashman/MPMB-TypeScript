/*
  Adobe interface declarations
*/
interface Field {
	readonly: boolean;
	value: string | number;
	setAction(trigger: string, action: string): void;
	page: number;
}
declare const tDoc: {
	getField(field: FieldIdentifier): Field;
};
type FieldIdentifier = string;
declare const console: {
	println(string): string;
	show(): void;
};