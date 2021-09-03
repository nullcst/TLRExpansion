import { CHARDB } from "./DatabaseSetup";

// general database function library

/* ---------------------------------
 * Utility Functions for Raw Queries
 * ---------------------------------
*/

export function stringFromSql(s: string) : string { // only used when we gotta take stuff back idk why I'm obsessed with this
    return s.replace(/zzzz/g, '\\');
}

export function stringToSql(s: string) : string {
    return s.replace(/\\/g, 'zzzz');
}

/**
 * Don't forget to use stringFrom/ToSql() before if using this for anything that has \ involved
 * @param what {string} SELECT what ...
 * @param from {string} ... FROM from ...
 * @param where {string} ... WHERE where ...
 * @param to {string} ... = to!
*/
export function Q_is_equal(what: string, from: string, where: string, to: string) : boolean {
    let query:string = "SELECT " + what + " FROM " + from + " WHERE " + where + " = " + '\'' + to + '\'' + ";";
    if (CHARDB.read(query)) return true;
    return false;
}

/**
 * Don't forget to use stringFrom/ToSql() before if using this for anything that has \ involved
 * @param what {string} SELECT what ...
 * @param from {string} ... FROM from ...
 * @param where {string} ... WHERE where ...
 * @param to {string} ... LIKE to!
*/
export function Q_is_similar(what: string, from: string, where: string, to: string) : boolean {
    let query:string = "SELECT " + what + " FROM " + from + " WHERE " + where + " LIKE " + '\'%' + to + '%\'' + ";";
    if (CHARDB.read(query)) return true;
    return false;
}

/**
 * Don't forget to use stringFrom/ToSql() before if using this for anything that has \ involved, 
 * @param what {number} SELECT what ... // for strings use Q_exists_string()
 * @param from {string} ... FROM from ...
*/
export function Q_exists(what: number, from: string) : boolean {
    let query:string = "SELECT " + what + " FROM " + from + " WHERE " + what + " = " + what + ";";
    if ((CHARDB.read(query).length < 1)) return false;
    return true;
}

/**
 * Don't forget to use stringFrom/ToSql() before if using this for anything that has \ involved
 * @param what {string} SELECT what ...
 * @param from {string} ... FROM from ...
*/
export function Q_exists_string(what: string, from: string) : boolean {
    let query:string = "SELECT " + what + " FROM " + from + " WHERE " + what + " = " + '\'' + what + '\'' + ";"
    if ((CHARDB.read(query).length < 1)) return false;
    return true;
}