import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
} from '@prisma/client/runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }

/**
 * Query Engine version: afd294205618b1c825b013ba6f5a6ebe4aa4a514
 * Prisma Client JS version: 2.0.0-beta.4
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}


declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export declare type TrueKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string, collectTimestamps?: any): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/


export type Datasources = {
  db?: string
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  datasources?: Datasources

  /**
   * @default "pretty"
   */
  errorFormat?: ErrorFormat

  log?: Array<LogLevel | LogDefinition>

  /**
   * You probably don't want to use this. `__internal` is used by internal tooling.
   */
  __internal?: {
    debug?: boolean
    hooks?: Hooks
    engine?: {
      cwd?: string
      binaryPath?: string
    }
    measurePerformance?: boolean
  }

  /**
   * Useful for pgbouncer
   */
  forceTransactions?: boolean
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends Array<LogLevel | LogDefinition>> = GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]>

export type QueryEvent = {
  timestamp: Date
  query: string
  params: string
  duration: number
  target: string
}

export type LogEvent = {
  timestamp: Date
  message: string
  target: string
}
/* End Types for Logging */

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Countries
 * const countries = await prisma.country.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
 */
export declare class PrismaClient<T extends PrismaClientOptions = {}, U = keyof T extends 'log' ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Countries
   * const countries = await prisma.country.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md).
   */
  constructor(optionsArg?: T);
  on<V extends U>(eventType: V, callback: V extends never ? never : (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  connect(): Promise<void>;
  /**
   * @private
   */
  private runDisconnect;
  /**
   * Disconnect from the database
   */
  disconnect(): Promise<any>;
  /**
   * Makes a raw query
   * @example
   * ```
   * // Fetch all entries from the `User` table
   * const result = await prisma.raw`SELECT * FROM User;`
   * // Or
   * const result = await prisma.raw('SELECT * FROM User;')
   * 
   * // With parameters use prisma.raw``, values will be escaped automatically
   * const userId = '1'
   * const result = await prisma.raw`SELECT * FROM User WHERE id = ${userId};`
  * ```
  * 
  * Read more in our [docs](https://github.com/prisma/prisma/blob/master/docs/prisma-client-js/api.md#raw-database-access).
  */
  raw<T = any>(query: string | TemplateStringsArray, ...values: any[]): Promise<T>;

  /**
   * `prisma.country`: Exposes CRUD operations for the **country** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Countries
    * const countries = await prisma.country.findMany()
    * ```
    */
  get country(): countryDelegate;

  /**
   * `prisma.identity`: Exposes CRUD operations for the **identity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Identities
    * const identities = await prisma.identity.findMany()
    * ```
    */
  get identity(): identityDelegate;

  /**
   * `prisma.restaurant`: Exposes CRUD operations for the **restaurant** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Restaurants
    * const restaurants = await prisma.restaurant.findMany()
    * ```
    */
  get restaurant(): restaurantDelegate;

  /**
   * `prisma.restaurantcategory`: Exposes CRUD operations for the **restaurantcategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Restaurantcategories
    * const restaurantcategories = await prisma.restaurantcategory.findMany()
    * ```
    */
  get restaurantcategory(): restaurantcategoryDelegate;

  /**
   * `prisma.restaurantsubcategory`: Exposes CRUD operations for the **restaurantsubcategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Restaurantsubcategories
    * const restaurantsubcategories = await prisma.restaurantsubcategory.findMany()
    * ```
    */
  get restaurantsubcategory(): restaurantsubcategoryDelegate;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): userDelegate;

  /**
   * `prisma.userrestaurantrecord`: Exposes CRUD operations for the **userrestaurantrecord** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Userrestaurantrecords
    * const userrestaurantrecords = await prisma.userrestaurantrecord.findMany()
    * ```
    */
  get userrestaurantrecord(): userrestaurantrecordDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const OrderByArg: {
  asc: 'asc',
  desc: 'desc'
};

export declare type OrderByArg = (typeof OrderByArg)[keyof typeof OrderByArg]



/**
 * Model country
 */

export type country = {
  id: string
  name: string | null
}

export type countrySelect = {
  id?: boolean
  name?: boolean
  restaurant?: boolean | FindManyrestaurantArgs
  user?: boolean | FindManyuserArgs
}

export type countryInclude = {
  restaurant?: boolean | FindManyrestaurantArgs
  user?: boolean | FindManyuserArgs
}

export type countryGetPayload<
  S extends boolean | null | undefined | countryArgs,
  U = keyof S
> = S extends true
  ? country
  : S extends undefined
  ? never
  : S extends countryArgs | FindManycountryArgs
  ? 'include' extends U
    ? country  & {
      [P in TrueKeys<S['include']>]:
      P extends 'restaurant'
      ? Array<restaurantGetPayload<S['include'][P]>> :
      P extends 'user'
      ? Array<userGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof country ? country[P]
: 
      P extends 'restaurant'
      ? Array<restaurantGetPayload<S['select'][P]>> :
      P extends 'user'
      ? Array<userGetPayload<S['select'][P]>> : never
    }
  : country
: country


export interface countryDelegate {
  /**
   * Find zero or one Country.
   * @param {FindOnecountryArgs} args - Arguments to find a Country
   * @example
   * // Get one Country
   * const country = await prisma.country.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnecountryArgs>(
    args: Subset<T, FindOnecountryArgs>
  ): CheckSelect<T, countryClient<country | null>, countryClient<countryGetPayload<T> | null>>
  /**
   * Find zero or more Countries.
   * @param {FindManycountryArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Countries
   * const countries = await prisma.country.findMany()
   * 
   * // Get first 10 Countries
   * const countries = await prisma.country.findMany({ first: 10 })
   * 
   * // Only select the `id`
   * const countryWithIdOnly = await prisma.country.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManycountryArgs>(
    args?: Subset<T, FindManycountryArgs>
  ): CheckSelect<T, Promise<Array<country>>, Promise<Array<countryGetPayload<T>>>>
  /**
   * Create a Country.
   * @param {countryCreateArgs} args - Arguments to create a Country.
   * @example
   * // Create one Country
   * const user = await prisma.country.create({
   *   data: {
   *     // ... data to create a Country
   *   }
   * })
   * 
  **/
  create<T extends countryCreateArgs>(
    args: Subset<T, countryCreateArgs>
  ): CheckSelect<T, countryClient<country>, countryClient<countryGetPayload<T>>>
  /**
   * Delete a Country.
   * @param {countryDeleteArgs} args - Arguments to delete one Country.
   * @example
   * // Delete one Country
   * const user = await prisma.country.delete({
   *   where: {
   *     // ... filter to delete one Country
   *   }
   * })
   * 
  **/
  delete<T extends countryDeleteArgs>(
    args: Subset<T, countryDeleteArgs>
  ): CheckSelect<T, countryClient<country>, countryClient<countryGetPayload<T>>>
  /**
   * Update one Country.
   * @param {countryUpdateArgs} args - Arguments to update one Country.
   * @example
   * // Update one Country
   * const country = await prisma.country.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends countryUpdateArgs>(
    args: Subset<T, countryUpdateArgs>
  ): CheckSelect<T, countryClient<country>, countryClient<countryGetPayload<T>>>
  /**
   * Delete zero or more Countries.
   * @param {countryDeleteManyArgs} args - Arguments to filter Countries to delete.
   * @example
   * // Delete a few Countries
   * const { count } = await prisma.country.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends countryDeleteManyArgs>(
    args: Subset<T, countryDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Countries.
   * @param {countryUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Countries
   * const country = await prisma.country.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends countryUpdateManyArgs>(
    args: Subset<T, countryUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Country.
   * @param {countryUpsertArgs} args - Arguments to update or create a Country.
   * @example
   * // Update or create a Country
   * const country = await prisma.country.upsert({
   *   create: {
   *     // ... data to create a Country
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Country we want to update
   *   }
   * })
  **/
  upsert<T extends countryUpsertArgs>(
    args: Subset<T, countryUpsertArgs>
  ): CheckSelect<T, countryClient<country>, countryClient<countryGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManycountryArgs, 'select' | 'include'>): Promise<number>
}

export declare class countryClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  restaurant<T extends FindManyrestaurantArgs = {}>(args?: Subset<T, FindManyrestaurantArgs>): CheckSelect<T, Promise<Array<restaurant>>, Promise<Array<restaurantGetPayload<T>>>>;

  user<T extends FindManyuserArgs = {}>(args?: Subset<T, FindManyuserArgs>): CheckSelect<T, Promise<Array<user>>, Promise<Array<userGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * country findOne
 */
export type FindOnecountryArgs = {
  /**
   * Select specific fields to fetch from the country
  **/
  select?: countrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: countryInclude | null
  /**
   * Filter, which country to fetch.
  **/
  where: countryWhereUniqueInput
}


/**
 * country findMany
 */
export type FindManycountryArgs = {
  /**
   * Select specific fields to fetch from the country
  **/
  select?: countrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: countryInclude | null
  /**
   * Filter, which countries to fetch.
  **/
  where?: countryWhereInput | null
  /**
   * Determine the order of the countries to fetch.
  **/
  orderBy?: countryOrderByInput | null
  /**
   * Skip the first `n` countries.
  **/
  skip?: number | null
  /**
   * Get all countries that come after the country you provide with the current order.
  **/
  after?: countryWhereUniqueInput | null
  /**
   * Get all countries that come before the country you provide with the current order.
  **/
  before?: countryWhereUniqueInput | null
  /**
   * Get the first `n` countries.
  **/
  first?: number | null
  /**
   * Get the last `n` countries.
  **/
  last?: number | null
}


/**
 * country create
 */
export type countryCreateArgs = {
  /**
   * Select specific fields to fetch from the country
  **/
  select?: countrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: countryInclude | null
  /**
   * The data needed to create a country.
  **/
  data: countryCreateInput
}


/**
 * country update
 */
export type countryUpdateArgs = {
  /**
   * Select specific fields to fetch from the country
  **/
  select?: countrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: countryInclude | null
  /**
   * The data needed to update a country.
  **/
  data: countryUpdateInput
  /**
   * Choose, which country to update.
  **/
  where: countryWhereUniqueInput
}


/**
 * country updateMany
 */
export type countryUpdateManyArgs = {
  data: countryUpdateManyMutationInput
  where?: countryWhereInput | null
}


/**
 * country upsert
 */
export type countryUpsertArgs = {
  /**
   * Select specific fields to fetch from the country
  **/
  select?: countrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: countryInclude | null
  /**
   * The filter to search for the country to update in case it exists.
  **/
  where: countryWhereUniqueInput
  /**
   * In case the country found by the `where` argument doesn't exist, create a new country with this data.
  **/
  create: countryCreateInput
  /**
   * In case the country was found with the provided `where` argument, update it with this data.
  **/
  update: countryUpdateInput
}


/**
 * country delete
 */
export type countryDeleteArgs = {
  /**
   * Select specific fields to fetch from the country
  **/
  select?: countrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: countryInclude | null
  /**
   * Filter which country to delete.
  **/
  where: countryWhereUniqueInput
}


/**
 * country deleteMany
 */
export type countryDeleteManyArgs = {
  where?: countryWhereInput | null
}


/**
 * country without action
 */
export type countryArgs = {
  /**
   * Select specific fields to fetch from the country
  **/
  select?: countrySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: countryInclude | null
}



/**
 * Model identity
 */

export type identity = {
  ArchivedAt: Date | null
  ConfirmedAt: Date | null
  Created: Date
  Email: string
  Id: number
  IsConfirmed: boolean
  LastModified: Date
  Password: string
  RefreshToken: string | null
  Username: string
}

export type identitySelect = {
  ArchivedAt?: boolean
  ConfirmedAt?: boolean
  Created?: boolean
  Email?: boolean
  Id?: boolean
  IsConfirmed?: boolean
  LastModified?: boolean
  Password?: boolean
  RefreshToken?: boolean
  Username?: boolean
  user?: boolean | FindManyuserArgs
}

export type identityInclude = {
  user?: boolean | FindManyuserArgs
}

export type identityGetPayload<
  S extends boolean | null | undefined | identityArgs,
  U = keyof S
> = S extends true
  ? identity
  : S extends undefined
  ? never
  : S extends identityArgs | FindManyidentityArgs
  ? 'include' extends U
    ? identity  & {
      [P in TrueKeys<S['include']>]:
      P extends 'user'
      ? Array<userGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof identity ? identity[P]
: 
      P extends 'user'
      ? Array<userGetPayload<S['select'][P]>> : never
    }
  : identity
: identity


export interface identityDelegate {
  /**
   * Find zero or one Identity.
   * @param {FindOneidentityArgs} args - Arguments to find a Identity
   * @example
   * // Get one Identity
   * const identity = await prisma.identity.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneidentityArgs>(
    args: Subset<T, FindOneidentityArgs>
  ): CheckSelect<T, identityClient<identity | null>, identityClient<identityGetPayload<T> | null>>
  /**
   * Find zero or more Identities.
   * @param {FindManyidentityArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Identities
   * const identities = await prisma.identity.findMany()
   * 
   * // Get first 10 Identities
   * const identities = await prisma.identity.findMany({ first: 10 })
   * 
   * // Only select the `ArchivedAt`
   * const identityWithArchivedAtOnly = await prisma.identity.findMany({ select: { ArchivedAt: true } })
   * 
  **/
  findMany<T extends FindManyidentityArgs>(
    args?: Subset<T, FindManyidentityArgs>
  ): CheckSelect<T, Promise<Array<identity>>, Promise<Array<identityGetPayload<T>>>>
  /**
   * Create a Identity.
   * @param {identityCreateArgs} args - Arguments to create a Identity.
   * @example
   * // Create one Identity
   * const user = await prisma.identity.create({
   *   data: {
   *     // ... data to create a Identity
   *   }
   * })
   * 
  **/
  create<T extends identityCreateArgs>(
    args: Subset<T, identityCreateArgs>
  ): CheckSelect<T, identityClient<identity>, identityClient<identityGetPayload<T>>>
  /**
   * Delete a Identity.
   * @param {identityDeleteArgs} args - Arguments to delete one Identity.
   * @example
   * // Delete one Identity
   * const user = await prisma.identity.delete({
   *   where: {
   *     // ... filter to delete one Identity
   *   }
   * })
   * 
  **/
  delete<T extends identityDeleteArgs>(
    args: Subset<T, identityDeleteArgs>
  ): CheckSelect<T, identityClient<identity>, identityClient<identityGetPayload<T>>>
  /**
   * Update one Identity.
   * @param {identityUpdateArgs} args - Arguments to update one Identity.
   * @example
   * // Update one Identity
   * const identity = await prisma.identity.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends identityUpdateArgs>(
    args: Subset<T, identityUpdateArgs>
  ): CheckSelect<T, identityClient<identity>, identityClient<identityGetPayload<T>>>
  /**
   * Delete zero or more Identities.
   * @param {identityDeleteManyArgs} args - Arguments to filter Identities to delete.
   * @example
   * // Delete a few Identities
   * const { count } = await prisma.identity.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends identityDeleteManyArgs>(
    args: Subset<T, identityDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Identities.
   * @param {identityUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Identities
   * const identity = await prisma.identity.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends identityUpdateManyArgs>(
    args: Subset<T, identityUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Identity.
   * @param {identityUpsertArgs} args - Arguments to update or create a Identity.
   * @example
   * // Update or create a Identity
   * const identity = await prisma.identity.upsert({
   *   create: {
   *     // ... data to create a Identity
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Identity we want to update
   *   }
   * })
  **/
  upsert<T extends identityUpsertArgs>(
    args: Subset<T, identityUpsertArgs>
  ): CheckSelect<T, identityClient<identity>, identityClient<identityGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyidentityArgs, 'select' | 'include'>): Promise<number>
}

export declare class identityClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  user<T extends FindManyuserArgs = {}>(args?: Subset<T, FindManyuserArgs>): CheckSelect<T, Promise<Array<user>>, Promise<Array<userGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * identity findOne
 */
export type FindOneidentityArgs = {
  /**
   * Select specific fields to fetch from the identity
  **/
  select?: identitySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: identityInclude | null
  /**
   * Filter, which identity to fetch.
  **/
  where: identityWhereUniqueInput
}


/**
 * identity findMany
 */
export type FindManyidentityArgs = {
  /**
   * Select specific fields to fetch from the identity
  **/
  select?: identitySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: identityInclude | null
  /**
   * Filter, which identities to fetch.
  **/
  where?: identityWhereInput | null
  /**
   * Determine the order of the identities to fetch.
  **/
  orderBy?: identityOrderByInput | null
  /**
   * Skip the first `n` identities.
  **/
  skip?: number | null
  /**
   * Get all identities that come after the identity you provide with the current order.
  **/
  after?: identityWhereUniqueInput | null
  /**
   * Get all identities that come before the identity you provide with the current order.
  **/
  before?: identityWhereUniqueInput | null
  /**
   * Get the first `n` identities.
  **/
  first?: number | null
  /**
   * Get the last `n` identities.
  **/
  last?: number | null
}


/**
 * identity create
 */
export type identityCreateArgs = {
  /**
   * Select specific fields to fetch from the identity
  **/
  select?: identitySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: identityInclude | null
  /**
   * The data needed to create a identity.
  **/
  data: identityCreateInput
}


/**
 * identity update
 */
export type identityUpdateArgs = {
  /**
   * Select specific fields to fetch from the identity
  **/
  select?: identitySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: identityInclude | null
  /**
   * The data needed to update a identity.
  **/
  data: identityUpdateInput
  /**
   * Choose, which identity to update.
  **/
  where: identityWhereUniqueInput
}


/**
 * identity updateMany
 */
export type identityUpdateManyArgs = {
  data: identityUpdateManyMutationInput
  where?: identityWhereInput | null
}


/**
 * identity upsert
 */
export type identityUpsertArgs = {
  /**
   * Select specific fields to fetch from the identity
  **/
  select?: identitySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: identityInclude | null
  /**
   * The filter to search for the identity to update in case it exists.
  **/
  where: identityWhereUniqueInput
  /**
   * In case the identity found by the `where` argument doesn't exist, create a new identity with this data.
  **/
  create: identityCreateInput
  /**
   * In case the identity was found with the provided `where` argument, update it with this data.
  **/
  update: identityUpdateInput
}


/**
 * identity delete
 */
export type identityDeleteArgs = {
  /**
   * Select specific fields to fetch from the identity
  **/
  select?: identitySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: identityInclude | null
  /**
   * Filter which identity to delete.
  **/
  where: identityWhereUniqueInput
}


/**
 * identity deleteMany
 */
export type identityDeleteManyArgs = {
  where?: identityWhereInput | null
}


/**
 * identity without action
 */
export type identityArgs = {
  /**
   * Select specific fields to fetch from the identity
  **/
  select?: identitySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: identityInclude | null
}



/**
 * Model restaurant
 */

export type restaurant = {
  Adress: string | null
  CategoryId: number
  CountryId: string | null
  Created: Date
  Id: number
  Image: string | null
  LastModified: Date
  Name: string
  SubcategoryId: number
}

export type restaurantSelect = {
  Adress?: boolean
  CategoryId?: boolean
  CountryId?: boolean
  Created?: boolean
  Id?: boolean
  Image?: boolean
  LastModified?: boolean
  Name?: boolean
  SubcategoryId?: boolean
  restaurantcategory?: boolean | restaurantcategoryArgs
  country?: boolean | countryArgs
  restaurantsubcategory?: boolean | restaurantsubcategoryArgs
  userrestaurantrecord?: boolean | FindManyuserrestaurantrecordArgs
}

export type restaurantInclude = {
  restaurantcategory?: boolean | restaurantcategoryArgs
  country?: boolean | countryArgs
  restaurantsubcategory?: boolean | restaurantsubcategoryArgs
  userrestaurantrecord?: boolean | FindManyuserrestaurantrecordArgs
}

export type restaurantGetPayload<
  S extends boolean | null | undefined | restaurantArgs,
  U = keyof S
> = S extends true
  ? restaurant
  : S extends undefined
  ? never
  : S extends restaurantArgs | FindManyrestaurantArgs
  ? 'include' extends U
    ? restaurant  & {
      [P in TrueKeys<S['include']>]:
      P extends 'restaurantcategory'
      ? restaurantcategoryGetPayload<S['include'][P]> :
      P extends 'country'
      ? countryGetPayload<S['include'][P]> | null :
      P extends 'restaurantsubcategory'
      ? restaurantsubcategoryGetPayload<S['include'][P]> :
      P extends 'userrestaurantrecord'
      ? Array<userrestaurantrecordGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof restaurant ? restaurant[P]
: 
      P extends 'restaurantcategory'
      ? restaurantcategoryGetPayload<S['select'][P]> :
      P extends 'country'
      ? countryGetPayload<S['select'][P]> | null :
      P extends 'restaurantsubcategory'
      ? restaurantsubcategoryGetPayload<S['select'][P]> :
      P extends 'userrestaurantrecord'
      ? Array<userrestaurantrecordGetPayload<S['select'][P]>> : never
    }
  : restaurant
: restaurant


export interface restaurantDelegate {
  /**
   * Find zero or one Restaurant.
   * @param {FindOnerestaurantArgs} args - Arguments to find a Restaurant
   * @example
   * // Get one Restaurant
   * const restaurant = await prisma.restaurant.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnerestaurantArgs>(
    args: Subset<T, FindOnerestaurantArgs>
  ): CheckSelect<T, restaurantClient<restaurant | null>, restaurantClient<restaurantGetPayload<T> | null>>
  /**
   * Find zero or more Restaurants.
   * @param {FindManyrestaurantArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Restaurants
   * const restaurants = await prisma.restaurant.findMany()
   * 
   * // Get first 10 Restaurants
   * const restaurants = await prisma.restaurant.findMany({ first: 10 })
   * 
   * // Only select the `Adress`
   * const restaurantWithAdressOnly = await prisma.restaurant.findMany({ select: { Adress: true } })
   * 
  **/
  findMany<T extends FindManyrestaurantArgs>(
    args?: Subset<T, FindManyrestaurantArgs>
  ): CheckSelect<T, Promise<Array<restaurant>>, Promise<Array<restaurantGetPayload<T>>>>
  /**
   * Create a Restaurant.
   * @param {restaurantCreateArgs} args - Arguments to create a Restaurant.
   * @example
   * // Create one Restaurant
   * const user = await prisma.restaurant.create({
   *   data: {
   *     // ... data to create a Restaurant
   *   }
   * })
   * 
  **/
  create<T extends restaurantCreateArgs>(
    args: Subset<T, restaurantCreateArgs>
  ): CheckSelect<T, restaurantClient<restaurant>, restaurantClient<restaurantGetPayload<T>>>
  /**
   * Delete a Restaurant.
   * @param {restaurantDeleteArgs} args - Arguments to delete one Restaurant.
   * @example
   * // Delete one Restaurant
   * const user = await prisma.restaurant.delete({
   *   where: {
   *     // ... filter to delete one Restaurant
   *   }
   * })
   * 
  **/
  delete<T extends restaurantDeleteArgs>(
    args: Subset<T, restaurantDeleteArgs>
  ): CheckSelect<T, restaurantClient<restaurant>, restaurantClient<restaurantGetPayload<T>>>
  /**
   * Update one Restaurant.
   * @param {restaurantUpdateArgs} args - Arguments to update one Restaurant.
   * @example
   * // Update one Restaurant
   * const restaurant = await prisma.restaurant.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends restaurantUpdateArgs>(
    args: Subset<T, restaurantUpdateArgs>
  ): CheckSelect<T, restaurantClient<restaurant>, restaurantClient<restaurantGetPayload<T>>>
  /**
   * Delete zero or more Restaurants.
   * @param {restaurantDeleteManyArgs} args - Arguments to filter Restaurants to delete.
   * @example
   * // Delete a few Restaurants
   * const { count } = await prisma.restaurant.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends restaurantDeleteManyArgs>(
    args: Subset<T, restaurantDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Restaurants.
   * @param {restaurantUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Restaurants
   * const restaurant = await prisma.restaurant.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends restaurantUpdateManyArgs>(
    args: Subset<T, restaurantUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Restaurant.
   * @param {restaurantUpsertArgs} args - Arguments to update or create a Restaurant.
   * @example
   * // Update or create a Restaurant
   * const restaurant = await prisma.restaurant.upsert({
   *   create: {
   *     // ... data to create a Restaurant
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Restaurant we want to update
   *   }
   * })
  **/
  upsert<T extends restaurantUpsertArgs>(
    args: Subset<T, restaurantUpsertArgs>
  ): CheckSelect<T, restaurantClient<restaurant>, restaurantClient<restaurantGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyrestaurantArgs, 'select' | 'include'>): Promise<number>
}

export declare class restaurantClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  restaurantcategory<T extends restaurantcategoryArgs = {}>(args?: Subset<T, restaurantcategoryArgs>): CheckSelect<T, restaurantcategoryClient<restaurantcategory | null>, restaurantcategoryClient<restaurantcategoryGetPayload<T> | null>>;

  country<T extends countryArgs = {}>(args?: Subset<T, countryArgs>): CheckSelect<T, countryClient<country | null>, countryClient<countryGetPayload<T> | null>>;

  restaurantsubcategory<T extends restaurantsubcategoryArgs = {}>(args?: Subset<T, restaurantsubcategoryArgs>): CheckSelect<T, restaurantsubcategoryClient<restaurantsubcategory | null>, restaurantsubcategoryClient<restaurantsubcategoryGetPayload<T> | null>>;

  userrestaurantrecord<T extends FindManyuserrestaurantrecordArgs = {}>(args?: Subset<T, FindManyuserrestaurantrecordArgs>): CheckSelect<T, Promise<Array<userrestaurantrecord>>, Promise<Array<userrestaurantrecordGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * restaurant findOne
 */
export type FindOnerestaurantArgs = {
  /**
   * Select specific fields to fetch from the restaurant
  **/
  select?: restaurantSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantInclude | null
  /**
   * Filter, which restaurant to fetch.
  **/
  where: restaurantWhereUniqueInput
}


/**
 * restaurant findMany
 */
export type FindManyrestaurantArgs = {
  /**
   * Select specific fields to fetch from the restaurant
  **/
  select?: restaurantSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantInclude | null
  /**
   * Filter, which restaurants to fetch.
  **/
  where?: restaurantWhereInput | null
  /**
   * Determine the order of the restaurants to fetch.
  **/
  orderBy?: restaurantOrderByInput | null
  /**
   * Skip the first `n` restaurants.
  **/
  skip?: number | null
  /**
   * Get all restaurants that come after the restaurant you provide with the current order.
  **/
  after?: restaurantWhereUniqueInput | null
  /**
   * Get all restaurants that come before the restaurant you provide with the current order.
  **/
  before?: restaurantWhereUniqueInput | null
  /**
   * Get the first `n` restaurants.
  **/
  first?: number | null
  /**
   * Get the last `n` restaurants.
  **/
  last?: number | null
}


/**
 * restaurant create
 */
export type restaurantCreateArgs = {
  /**
   * Select specific fields to fetch from the restaurant
  **/
  select?: restaurantSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantInclude | null
  /**
   * The data needed to create a restaurant.
  **/
  data: restaurantCreateInput
}


/**
 * restaurant update
 */
export type restaurantUpdateArgs = {
  /**
   * Select specific fields to fetch from the restaurant
  **/
  select?: restaurantSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantInclude | null
  /**
   * The data needed to update a restaurant.
  **/
  data: restaurantUpdateInput
  /**
   * Choose, which restaurant to update.
  **/
  where: restaurantWhereUniqueInput
}


/**
 * restaurant updateMany
 */
export type restaurantUpdateManyArgs = {
  data: restaurantUpdateManyMutationInput
  where?: restaurantWhereInput | null
}


/**
 * restaurant upsert
 */
export type restaurantUpsertArgs = {
  /**
   * Select specific fields to fetch from the restaurant
  **/
  select?: restaurantSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantInclude | null
  /**
   * The filter to search for the restaurant to update in case it exists.
  **/
  where: restaurantWhereUniqueInput
  /**
   * In case the restaurant found by the `where` argument doesn't exist, create a new restaurant with this data.
  **/
  create: restaurantCreateInput
  /**
   * In case the restaurant was found with the provided `where` argument, update it with this data.
  **/
  update: restaurantUpdateInput
}


/**
 * restaurant delete
 */
export type restaurantDeleteArgs = {
  /**
   * Select specific fields to fetch from the restaurant
  **/
  select?: restaurantSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantInclude | null
  /**
   * Filter which restaurant to delete.
  **/
  where: restaurantWhereUniqueInput
}


/**
 * restaurant deleteMany
 */
export type restaurantDeleteManyArgs = {
  where?: restaurantWhereInput | null
}


/**
 * restaurant without action
 */
export type restaurantArgs = {
  /**
   * Select specific fields to fetch from the restaurant
  **/
  select?: restaurantSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantInclude | null
}



/**
 * Model restaurantcategory
 */

export type restaurantcategory = {
  Created: Date
  Id: number
  LastModified: Date
  Name: string
}

export type restaurantcategorySelect = {
  Created?: boolean
  Id?: boolean
  LastModified?: boolean
  Name?: boolean
  restaurant?: boolean | FindManyrestaurantArgs
  restaurantsubcategory?: boolean | FindManyrestaurantsubcategoryArgs
}

export type restaurantcategoryInclude = {
  restaurant?: boolean | FindManyrestaurantArgs
  restaurantsubcategory?: boolean | FindManyrestaurantsubcategoryArgs
}

export type restaurantcategoryGetPayload<
  S extends boolean | null | undefined | restaurantcategoryArgs,
  U = keyof S
> = S extends true
  ? restaurantcategory
  : S extends undefined
  ? never
  : S extends restaurantcategoryArgs | FindManyrestaurantcategoryArgs
  ? 'include' extends U
    ? restaurantcategory  & {
      [P in TrueKeys<S['include']>]:
      P extends 'restaurant'
      ? Array<restaurantGetPayload<S['include'][P]>> :
      P extends 'restaurantsubcategory'
      ? Array<restaurantsubcategoryGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof restaurantcategory ? restaurantcategory[P]
: 
      P extends 'restaurant'
      ? Array<restaurantGetPayload<S['select'][P]>> :
      P extends 'restaurantsubcategory'
      ? Array<restaurantsubcategoryGetPayload<S['select'][P]>> : never
    }
  : restaurantcategory
: restaurantcategory


export interface restaurantcategoryDelegate {
  /**
   * Find zero or one Restaurantcategory.
   * @param {FindOnerestaurantcategoryArgs} args - Arguments to find a Restaurantcategory
   * @example
   * // Get one Restaurantcategory
   * const restaurantcategory = await prisma.restaurantcategory.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnerestaurantcategoryArgs>(
    args: Subset<T, FindOnerestaurantcategoryArgs>
  ): CheckSelect<T, restaurantcategoryClient<restaurantcategory | null>, restaurantcategoryClient<restaurantcategoryGetPayload<T> | null>>
  /**
   * Find zero or more Restaurantcategories.
   * @param {FindManyrestaurantcategoryArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Restaurantcategories
   * const restaurantcategories = await prisma.restaurantcategory.findMany()
   * 
   * // Get first 10 Restaurantcategories
   * const restaurantcategories = await prisma.restaurantcategory.findMany({ first: 10 })
   * 
   * // Only select the `Created`
   * const restaurantcategoryWithCreatedOnly = await prisma.restaurantcategory.findMany({ select: { Created: true } })
   * 
  **/
  findMany<T extends FindManyrestaurantcategoryArgs>(
    args?: Subset<T, FindManyrestaurantcategoryArgs>
  ): CheckSelect<T, Promise<Array<restaurantcategory>>, Promise<Array<restaurantcategoryGetPayload<T>>>>
  /**
   * Create a Restaurantcategory.
   * @param {restaurantcategoryCreateArgs} args - Arguments to create a Restaurantcategory.
   * @example
   * // Create one Restaurantcategory
   * const user = await prisma.restaurantcategory.create({
   *   data: {
   *     // ... data to create a Restaurantcategory
   *   }
   * })
   * 
  **/
  create<T extends restaurantcategoryCreateArgs>(
    args: Subset<T, restaurantcategoryCreateArgs>
  ): CheckSelect<T, restaurantcategoryClient<restaurantcategory>, restaurantcategoryClient<restaurantcategoryGetPayload<T>>>
  /**
   * Delete a Restaurantcategory.
   * @param {restaurantcategoryDeleteArgs} args - Arguments to delete one Restaurantcategory.
   * @example
   * // Delete one Restaurantcategory
   * const user = await prisma.restaurantcategory.delete({
   *   where: {
   *     // ... filter to delete one Restaurantcategory
   *   }
   * })
   * 
  **/
  delete<T extends restaurantcategoryDeleteArgs>(
    args: Subset<T, restaurantcategoryDeleteArgs>
  ): CheckSelect<T, restaurantcategoryClient<restaurantcategory>, restaurantcategoryClient<restaurantcategoryGetPayload<T>>>
  /**
   * Update one Restaurantcategory.
   * @param {restaurantcategoryUpdateArgs} args - Arguments to update one Restaurantcategory.
   * @example
   * // Update one Restaurantcategory
   * const restaurantcategory = await prisma.restaurantcategory.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends restaurantcategoryUpdateArgs>(
    args: Subset<T, restaurantcategoryUpdateArgs>
  ): CheckSelect<T, restaurantcategoryClient<restaurantcategory>, restaurantcategoryClient<restaurantcategoryGetPayload<T>>>
  /**
   * Delete zero or more Restaurantcategories.
   * @param {restaurantcategoryDeleteManyArgs} args - Arguments to filter Restaurantcategories to delete.
   * @example
   * // Delete a few Restaurantcategories
   * const { count } = await prisma.restaurantcategory.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends restaurantcategoryDeleteManyArgs>(
    args: Subset<T, restaurantcategoryDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Restaurantcategories.
   * @param {restaurantcategoryUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Restaurantcategories
   * const restaurantcategory = await prisma.restaurantcategory.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends restaurantcategoryUpdateManyArgs>(
    args: Subset<T, restaurantcategoryUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Restaurantcategory.
   * @param {restaurantcategoryUpsertArgs} args - Arguments to update or create a Restaurantcategory.
   * @example
   * // Update or create a Restaurantcategory
   * const restaurantcategory = await prisma.restaurantcategory.upsert({
   *   create: {
   *     // ... data to create a Restaurantcategory
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Restaurantcategory we want to update
   *   }
   * })
  **/
  upsert<T extends restaurantcategoryUpsertArgs>(
    args: Subset<T, restaurantcategoryUpsertArgs>
  ): CheckSelect<T, restaurantcategoryClient<restaurantcategory>, restaurantcategoryClient<restaurantcategoryGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyrestaurantcategoryArgs, 'select' | 'include'>): Promise<number>
}

export declare class restaurantcategoryClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  restaurant<T extends FindManyrestaurantArgs = {}>(args?: Subset<T, FindManyrestaurantArgs>): CheckSelect<T, Promise<Array<restaurant>>, Promise<Array<restaurantGetPayload<T>>>>;

  restaurantsubcategory<T extends FindManyrestaurantsubcategoryArgs = {}>(args?: Subset<T, FindManyrestaurantsubcategoryArgs>): CheckSelect<T, Promise<Array<restaurantsubcategory>>, Promise<Array<restaurantsubcategoryGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * restaurantcategory findOne
 */
export type FindOnerestaurantcategoryArgs = {
  /**
   * Select specific fields to fetch from the restaurantcategory
  **/
  select?: restaurantcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantcategoryInclude | null
  /**
   * Filter, which restaurantcategory to fetch.
  **/
  where: restaurantcategoryWhereUniqueInput
}


/**
 * restaurantcategory findMany
 */
export type FindManyrestaurantcategoryArgs = {
  /**
   * Select specific fields to fetch from the restaurantcategory
  **/
  select?: restaurantcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantcategoryInclude | null
  /**
   * Filter, which restaurantcategories to fetch.
  **/
  where?: restaurantcategoryWhereInput | null
  /**
   * Determine the order of the restaurantcategories to fetch.
  **/
  orderBy?: restaurantcategoryOrderByInput | null
  /**
   * Skip the first `n` restaurantcategories.
  **/
  skip?: number | null
  /**
   * Get all restaurantcategories that come after the restaurantcategory you provide with the current order.
  **/
  after?: restaurantcategoryWhereUniqueInput | null
  /**
   * Get all restaurantcategories that come before the restaurantcategory you provide with the current order.
  **/
  before?: restaurantcategoryWhereUniqueInput | null
  /**
   * Get the first `n` restaurantcategories.
  **/
  first?: number | null
  /**
   * Get the last `n` restaurantcategories.
  **/
  last?: number | null
}


/**
 * restaurantcategory create
 */
export type restaurantcategoryCreateArgs = {
  /**
   * Select specific fields to fetch from the restaurantcategory
  **/
  select?: restaurantcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantcategoryInclude | null
  /**
   * The data needed to create a restaurantcategory.
  **/
  data: restaurantcategoryCreateInput
}


/**
 * restaurantcategory update
 */
export type restaurantcategoryUpdateArgs = {
  /**
   * Select specific fields to fetch from the restaurantcategory
  **/
  select?: restaurantcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantcategoryInclude | null
  /**
   * The data needed to update a restaurantcategory.
  **/
  data: restaurantcategoryUpdateInput
  /**
   * Choose, which restaurantcategory to update.
  **/
  where: restaurantcategoryWhereUniqueInput
}


/**
 * restaurantcategory updateMany
 */
export type restaurantcategoryUpdateManyArgs = {
  data: restaurantcategoryUpdateManyMutationInput
  where?: restaurantcategoryWhereInput | null
}


/**
 * restaurantcategory upsert
 */
export type restaurantcategoryUpsertArgs = {
  /**
   * Select specific fields to fetch from the restaurantcategory
  **/
  select?: restaurantcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantcategoryInclude | null
  /**
   * The filter to search for the restaurantcategory to update in case it exists.
  **/
  where: restaurantcategoryWhereUniqueInput
  /**
   * In case the restaurantcategory found by the `where` argument doesn't exist, create a new restaurantcategory with this data.
  **/
  create: restaurantcategoryCreateInput
  /**
   * In case the restaurantcategory was found with the provided `where` argument, update it with this data.
  **/
  update: restaurantcategoryUpdateInput
}


/**
 * restaurantcategory delete
 */
export type restaurantcategoryDeleteArgs = {
  /**
   * Select specific fields to fetch from the restaurantcategory
  **/
  select?: restaurantcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantcategoryInclude | null
  /**
   * Filter which restaurantcategory to delete.
  **/
  where: restaurantcategoryWhereUniqueInput
}


/**
 * restaurantcategory deleteMany
 */
export type restaurantcategoryDeleteManyArgs = {
  where?: restaurantcategoryWhereInput | null
}


/**
 * restaurantcategory without action
 */
export type restaurantcategoryArgs = {
  /**
   * Select specific fields to fetch from the restaurantcategory
  **/
  select?: restaurantcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantcategoryInclude | null
}



/**
 * Model restaurantsubcategory
 */

export type restaurantsubcategory = {
  CategoryId: number
  Created: Date
  Id: number
  LastModified: Date
  Name: string
}

export type restaurantsubcategorySelect = {
  CategoryId?: boolean
  Created?: boolean
  Id?: boolean
  LastModified?: boolean
  Name?: boolean
  restaurantcategory?: boolean | restaurantcategoryArgs
  restaurant?: boolean | FindManyrestaurantArgs
}

export type restaurantsubcategoryInclude = {
  restaurantcategory?: boolean | restaurantcategoryArgs
  restaurant?: boolean | FindManyrestaurantArgs
}

export type restaurantsubcategoryGetPayload<
  S extends boolean | null | undefined | restaurantsubcategoryArgs,
  U = keyof S
> = S extends true
  ? restaurantsubcategory
  : S extends undefined
  ? never
  : S extends restaurantsubcategoryArgs | FindManyrestaurantsubcategoryArgs
  ? 'include' extends U
    ? restaurantsubcategory  & {
      [P in TrueKeys<S['include']>]:
      P extends 'restaurantcategory'
      ? restaurantcategoryGetPayload<S['include'][P]> :
      P extends 'restaurant'
      ? Array<restaurantGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof restaurantsubcategory ? restaurantsubcategory[P]
: 
      P extends 'restaurantcategory'
      ? restaurantcategoryGetPayload<S['select'][P]> :
      P extends 'restaurant'
      ? Array<restaurantGetPayload<S['select'][P]>> : never
    }
  : restaurantsubcategory
: restaurantsubcategory


export interface restaurantsubcategoryDelegate {
  /**
   * Find zero or one Restaurantsubcategory.
   * @param {FindOnerestaurantsubcategoryArgs} args - Arguments to find a Restaurantsubcategory
   * @example
   * // Get one Restaurantsubcategory
   * const restaurantsubcategory = await prisma.restaurantsubcategory.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnerestaurantsubcategoryArgs>(
    args: Subset<T, FindOnerestaurantsubcategoryArgs>
  ): CheckSelect<T, restaurantsubcategoryClient<restaurantsubcategory | null>, restaurantsubcategoryClient<restaurantsubcategoryGetPayload<T> | null>>
  /**
   * Find zero or more Restaurantsubcategories.
   * @param {FindManyrestaurantsubcategoryArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Restaurantsubcategories
   * const restaurantsubcategories = await prisma.restaurantsubcategory.findMany()
   * 
   * // Get first 10 Restaurantsubcategories
   * const restaurantsubcategories = await prisma.restaurantsubcategory.findMany({ first: 10 })
   * 
   * // Only select the `CategoryId`
   * const restaurantsubcategoryWithCategoryIdOnly = await prisma.restaurantsubcategory.findMany({ select: { CategoryId: true } })
   * 
  **/
  findMany<T extends FindManyrestaurantsubcategoryArgs>(
    args?: Subset<T, FindManyrestaurantsubcategoryArgs>
  ): CheckSelect<T, Promise<Array<restaurantsubcategory>>, Promise<Array<restaurantsubcategoryGetPayload<T>>>>
  /**
   * Create a Restaurantsubcategory.
   * @param {restaurantsubcategoryCreateArgs} args - Arguments to create a Restaurantsubcategory.
   * @example
   * // Create one Restaurantsubcategory
   * const user = await prisma.restaurantsubcategory.create({
   *   data: {
   *     // ... data to create a Restaurantsubcategory
   *   }
   * })
   * 
  **/
  create<T extends restaurantsubcategoryCreateArgs>(
    args: Subset<T, restaurantsubcategoryCreateArgs>
  ): CheckSelect<T, restaurantsubcategoryClient<restaurantsubcategory>, restaurantsubcategoryClient<restaurantsubcategoryGetPayload<T>>>
  /**
   * Delete a Restaurantsubcategory.
   * @param {restaurantsubcategoryDeleteArgs} args - Arguments to delete one Restaurantsubcategory.
   * @example
   * // Delete one Restaurantsubcategory
   * const user = await prisma.restaurantsubcategory.delete({
   *   where: {
   *     // ... filter to delete one Restaurantsubcategory
   *   }
   * })
   * 
  **/
  delete<T extends restaurantsubcategoryDeleteArgs>(
    args: Subset<T, restaurantsubcategoryDeleteArgs>
  ): CheckSelect<T, restaurantsubcategoryClient<restaurantsubcategory>, restaurantsubcategoryClient<restaurantsubcategoryGetPayload<T>>>
  /**
   * Update one Restaurantsubcategory.
   * @param {restaurantsubcategoryUpdateArgs} args - Arguments to update one Restaurantsubcategory.
   * @example
   * // Update one Restaurantsubcategory
   * const restaurantsubcategory = await prisma.restaurantsubcategory.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends restaurantsubcategoryUpdateArgs>(
    args: Subset<T, restaurantsubcategoryUpdateArgs>
  ): CheckSelect<T, restaurantsubcategoryClient<restaurantsubcategory>, restaurantsubcategoryClient<restaurantsubcategoryGetPayload<T>>>
  /**
   * Delete zero or more Restaurantsubcategories.
   * @param {restaurantsubcategoryDeleteManyArgs} args - Arguments to filter Restaurantsubcategories to delete.
   * @example
   * // Delete a few Restaurantsubcategories
   * const { count } = await prisma.restaurantsubcategory.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends restaurantsubcategoryDeleteManyArgs>(
    args: Subset<T, restaurantsubcategoryDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Restaurantsubcategories.
   * @param {restaurantsubcategoryUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Restaurantsubcategories
   * const restaurantsubcategory = await prisma.restaurantsubcategory.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends restaurantsubcategoryUpdateManyArgs>(
    args: Subset<T, restaurantsubcategoryUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Restaurantsubcategory.
   * @param {restaurantsubcategoryUpsertArgs} args - Arguments to update or create a Restaurantsubcategory.
   * @example
   * // Update or create a Restaurantsubcategory
   * const restaurantsubcategory = await prisma.restaurantsubcategory.upsert({
   *   create: {
   *     // ... data to create a Restaurantsubcategory
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Restaurantsubcategory we want to update
   *   }
   * })
  **/
  upsert<T extends restaurantsubcategoryUpsertArgs>(
    args: Subset<T, restaurantsubcategoryUpsertArgs>
  ): CheckSelect<T, restaurantsubcategoryClient<restaurantsubcategory>, restaurantsubcategoryClient<restaurantsubcategoryGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyrestaurantsubcategoryArgs, 'select' | 'include'>): Promise<number>
}

export declare class restaurantsubcategoryClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  restaurantcategory<T extends restaurantcategoryArgs = {}>(args?: Subset<T, restaurantcategoryArgs>): CheckSelect<T, restaurantcategoryClient<restaurantcategory | null>, restaurantcategoryClient<restaurantcategoryGetPayload<T> | null>>;

  restaurant<T extends FindManyrestaurantArgs = {}>(args?: Subset<T, FindManyrestaurantArgs>): CheckSelect<T, Promise<Array<restaurant>>, Promise<Array<restaurantGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * restaurantsubcategory findOne
 */
export type FindOnerestaurantsubcategoryArgs = {
  /**
   * Select specific fields to fetch from the restaurantsubcategory
  **/
  select?: restaurantsubcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantsubcategoryInclude | null
  /**
   * Filter, which restaurantsubcategory to fetch.
  **/
  where: restaurantsubcategoryWhereUniqueInput
}


/**
 * restaurantsubcategory findMany
 */
export type FindManyrestaurantsubcategoryArgs = {
  /**
   * Select specific fields to fetch from the restaurantsubcategory
  **/
  select?: restaurantsubcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantsubcategoryInclude | null
  /**
   * Filter, which restaurantsubcategories to fetch.
  **/
  where?: restaurantsubcategoryWhereInput | null
  /**
   * Determine the order of the restaurantsubcategories to fetch.
  **/
  orderBy?: restaurantsubcategoryOrderByInput | null
  /**
   * Skip the first `n` restaurantsubcategories.
  **/
  skip?: number | null
  /**
   * Get all restaurantsubcategories that come after the restaurantsubcategory you provide with the current order.
  **/
  after?: restaurantsubcategoryWhereUniqueInput | null
  /**
   * Get all restaurantsubcategories that come before the restaurantsubcategory you provide with the current order.
  **/
  before?: restaurantsubcategoryWhereUniqueInput | null
  /**
   * Get the first `n` restaurantsubcategories.
  **/
  first?: number | null
  /**
   * Get the last `n` restaurantsubcategories.
  **/
  last?: number | null
}


/**
 * restaurantsubcategory create
 */
export type restaurantsubcategoryCreateArgs = {
  /**
   * Select specific fields to fetch from the restaurantsubcategory
  **/
  select?: restaurantsubcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantsubcategoryInclude | null
  /**
   * The data needed to create a restaurantsubcategory.
  **/
  data: restaurantsubcategoryCreateInput
}


/**
 * restaurantsubcategory update
 */
export type restaurantsubcategoryUpdateArgs = {
  /**
   * Select specific fields to fetch from the restaurantsubcategory
  **/
  select?: restaurantsubcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantsubcategoryInclude | null
  /**
   * The data needed to update a restaurantsubcategory.
  **/
  data: restaurantsubcategoryUpdateInput
  /**
   * Choose, which restaurantsubcategory to update.
  **/
  where: restaurantsubcategoryWhereUniqueInput
}


/**
 * restaurantsubcategory updateMany
 */
export type restaurantsubcategoryUpdateManyArgs = {
  data: restaurantsubcategoryUpdateManyMutationInput
  where?: restaurantsubcategoryWhereInput | null
}


/**
 * restaurantsubcategory upsert
 */
export type restaurantsubcategoryUpsertArgs = {
  /**
   * Select specific fields to fetch from the restaurantsubcategory
  **/
  select?: restaurantsubcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantsubcategoryInclude | null
  /**
   * The filter to search for the restaurantsubcategory to update in case it exists.
  **/
  where: restaurantsubcategoryWhereUniqueInput
  /**
   * In case the restaurantsubcategory found by the `where` argument doesn't exist, create a new restaurantsubcategory with this data.
  **/
  create: restaurantsubcategoryCreateInput
  /**
   * In case the restaurantsubcategory was found with the provided `where` argument, update it with this data.
  **/
  update: restaurantsubcategoryUpdateInput
}


/**
 * restaurantsubcategory delete
 */
export type restaurantsubcategoryDeleteArgs = {
  /**
   * Select specific fields to fetch from the restaurantsubcategory
  **/
  select?: restaurantsubcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantsubcategoryInclude | null
  /**
   * Filter which restaurantsubcategory to delete.
  **/
  where: restaurantsubcategoryWhereUniqueInput
}


/**
 * restaurantsubcategory deleteMany
 */
export type restaurantsubcategoryDeleteManyArgs = {
  where?: restaurantsubcategoryWhereInput | null
}


/**
 * restaurantsubcategory without action
 */
export type restaurantsubcategoryArgs = {
  /**
   * Select specific fields to fetch from the restaurantsubcategory
  **/
  select?: restaurantsubcategorySelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: restaurantsubcategoryInclude | null
}



/**
 * Model user
 */

export type user = {
  Adress: string | null
  ArchivedAt: Date | null
  Avatar: string | null
  BornOn: Date
  CountryId: string | null
  Created: Date
  FirstName: string
  Id: number
  IdentityId: number
  LastModified: Date
  LastName: string
  MiddleName: string | null
  Role: number
  Sex: boolean
  Username: string | null
}

export type userSelect = {
  Adress?: boolean
  ArchivedAt?: boolean
  Avatar?: boolean
  BornOn?: boolean
  CountryId?: boolean
  Created?: boolean
  FirstName?: boolean
  Id?: boolean
  IdentityId?: boolean
  LastModified?: boolean
  LastName?: boolean
  MiddleName?: boolean
  Role?: boolean
  Sex?: boolean
  Username?: boolean
  country?: boolean | countryArgs
  identity?: boolean | identityArgs
  userrestaurantrecord?: boolean | FindManyuserrestaurantrecordArgs
}

export type userInclude = {
  country?: boolean | countryArgs
  identity?: boolean | identityArgs
  userrestaurantrecord?: boolean | FindManyuserrestaurantrecordArgs
}

export type userGetPayload<
  S extends boolean | null | undefined | userArgs,
  U = keyof S
> = S extends true
  ? user
  : S extends undefined
  ? never
  : S extends userArgs | FindManyuserArgs
  ? 'include' extends U
    ? user  & {
      [P in TrueKeys<S['include']>]:
      P extends 'country'
      ? countryGetPayload<S['include'][P]> | null :
      P extends 'identity'
      ? identityGetPayload<S['include'][P]> :
      P extends 'userrestaurantrecord'
      ? Array<userrestaurantrecordGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof user ? user[P]
: 
      P extends 'country'
      ? countryGetPayload<S['select'][P]> | null :
      P extends 'identity'
      ? identityGetPayload<S['select'][P]> :
      P extends 'userrestaurantrecord'
      ? Array<userrestaurantrecordGetPayload<S['select'][P]>> : never
    }
  : user
: user


export interface userDelegate {
  /**
   * Find zero or one User.
   * @param {FindOneuserArgs} args - Arguments to find a User
   * @example
   * // Get one User
   * const user = await prisma.user.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneuserArgs>(
    args: Subset<T, FindOneuserArgs>
  ): CheckSelect<T, userClient<user | null>, userClient<userGetPayload<T> | null>>
  /**
   * Find zero or more Users.
   * @param {FindManyuserArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Users
   * const users = await prisma.user.findMany()
   * 
   * // Get first 10 Users
   * const users = await prisma.user.findMany({ first: 10 })
   * 
   * // Only select the `Adress`
   * const userWithAdressOnly = await prisma.user.findMany({ select: { Adress: true } })
   * 
  **/
  findMany<T extends FindManyuserArgs>(
    args?: Subset<T, FindManyuserArgs>
  ): CheckSelect<T, Promise<Array<user>>, Promise<Array<userGetPayload<T>>>>
  /**
   * Create a User.
   * @param {userCreateArgs} args - Arguments to create a User.
   * @example
   * // Create one User
   * const user = await prisma.user.create({
   *   data: {
   *     // ... data to create a User
   *   }
   * })
   * 
  **/
  create<T extends userCreateArgs>(
    args: Subset<T, userCreateArgs>
  ): CheckSelect<T, userClient<user>, userClient<userGetPayload<T>>>
  /**
   * Delete a User.
   * @param {userDeleteArgs} args - Arguments to delete one User.
   * @example
   * // Delete one User
   * const user = await prisma.user.delete({
   *   where: {
   *     // ... filter to delete one User
   *   }
   * })
   * 
  **/
  delete<T extends userDeleteArgs>(
    args: Subset<T, userDeleteArgs>
  ): CheckSelect<T, userClient<user>, userClient<userGetPayload<T>>>
  /**
   * Update one User.
   * @param {userUpdateArgs} args - Arguments to update one User.
   * @example
   * // Update one User
   * const user = await prisma.user.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends userUpdateArgs>(
    args: Subset<T, userUpdateArgs>
  ): CheckSelect<T, userClient<user>, userClient<userGetPayload<T>>>
  /**
   * Delete zero or more Users.
   * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
   * @example
   * // Delete a few Users
   * const { count } = await prisma.user.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends userDeleteManyArgs>(
    args: Subset<T, userDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Users.
   * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Users
   * const user = await prisma.user.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends userUpdateManyArgs>(
    args: Subset<T, userUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one User.
   * @param {userUpsertArgs} args - Arguments to update or create a User.
   * @example
   * // Update or create a User
   * const user = await prisma.user.upsert({
   *   create: {
   *     // ... data to create a User
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the User we want to update
   *   }
   * })
  **/
  upsert<T extends userUpsertArgs>(
    args: Subset<T, userUpsertArgs>
  ): CheckSelect<T, userClient<user>, userClient<userGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyuserArgs, 'select' | 'include'>): Promise<number>
}

export declare class userClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  country<T extends countryArgs = {}>(args?: Subset<T, countryArgs>): CheckSelect<T, countryClient<country | null>, countryClient<countryGetPayload<T> | null>>;

  identity<T extends identityArgs = {}>(args?: Subset<T, identityArgs>): CheckSelect<T, identityClient<identity | null>, identityClient<identityGetPayload<T> | null>>;

  userrestaurantrecord<T extends FindManyuserrestaurantrecordArgs = {}>(args?: Subset<T, FindManyuserrestaurantrecordArgs>): CheckSelect<T, Promise<Array<userrestaurantrecord>>, Promise<Array<userrestaurantrecordGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * user findOne
 */
export type FindOneuserArgs = {
  /**
   * Select specific fields to fetch from the user
  **/
  select?: userSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userInclude | null
  /**
   * Filter, which user to fetch.
  **/
  where: userWhereUniqueInput
}


/**
 * user findMany
 */
export type FindManyuserArgs = {
  /**
   * Select specific fields to fetch from the user
  **/
  select?: userSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userInclude | null
  /**
   * Filter, which users to fetch.
  **/
  where?: userWhereInput | null
  /**
   * Determine the order of the users to fetch.
  **/
  orderBy?: userOrderByInput | null
  /**
   * Skip the first `n` users.
  **/
  skip?: number | null
  /**
   * Get all users that come after the user you provide with the current order.
  **/
  after?: userWhereUniqueInput | null
  /**
   * Get all users that come before the user you provide with the current order.
  **/
  before?: userWhereUniqueInput | null
  /**
   * Get the first `n` users.
  **/
  first?: number | null
  /**
   * Get the last `n` users.
  **/
  last?: number | null
}


/**
 * user create
 */
export type userCreateArgs = {
  /**
   * Select specific fields to fetch from the user
  **/
  select?: userSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userInclude | null
  /**
   * The data needed to create a user.
  **/
  data: userCreateInput
}


/**
 * user update
 */
export type userUpdateArgs = {
  /**
   * Select specific fields to fetch from the user
  **/
  select?: userSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userInclude | null
  /**
   * The data needed to update a user.
  **/
  data: userUpdateInput
  /**
   * Choose, which user to update.
  **/
  where: userWhereUniqueInput
}


/**
 * user updateMany
 */
export type userUpdateManyArgs = {
  data: userUpdateManyMutationInput
  where?: userWhereInput | null
}


/**
 * user upsert
 */
export type userUpsertArgs = {
  /**
   * Select specific fields to fetch from the user
  **/
  select?: userSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userInclude | null
  /**
   * The filter to search for the user to update in case it exists.
  **/
  where: userWhereUniqueInput
  /**
   * In case the user found by the `where` argument doesn't exist, create a new user with this data.
  **/
  create: userCreateInput
  /**
   * In case the user was found with the provided `where` argument, update it with this data.
  **/
  update: userUpdateInput
}


/**
 * user delete
 */
export type userDeleteArgs = {
  /**
   * Select specific fields to fetch from the user
  **/
  select?: userSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userInclude | null
  /**
   * Filter which user to delete.
  **/
  where: userWhereUniqueInput
}


/**
 * user deleteMany
 */
export type userDeleteManyArgs = {
  where?: userWhereInput | null
}


/**
 * user without action
 */
export type userArgs = {
  /**
   * Select specific fields to fetch from the user
  **/
  select?: userSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userInclude | null
}



/**
 * Model userrestaurantrecord
 */

export type userrestaurantrecord = {
  Comment: string | null
  Created: Date
  DateVisited: Date | null
  Id: number
  IsFavorite: boolean
  LastModified: Date
  RestaurantId: number
  Status: number
  UserId: number
}

export type userrestaurantrecordSelect = {
  Comment?: boolean
  Created?: boolean
  DateVisited?: boolean
  Id?: boolean
  IsFavorite?: boolean
  LastModified?: boolean
  RestaurantId?: boolean
  Status?: boolean
  UserId?: boolean
  restaurant?: boolean | restaurantArgs
  user?: boolean | userArgs
}

export type userrestaurantrecordInclude = {
  restaurant?: boolean | restaurantArgs
  user?: boolean | userArgs
}

export type userrestaurantrecordGetPayload<
  S extends boolean | null | undefined | userrestaurantrecordArgs,
  U = keyof S
> = S extends true
  ? userrestaurantrecord
  : S extends undefined
  ? never
  : S extends userrestaurantrecordArgs | FindManyuserrestaurantrecordArgs
  ? 'include' extends U
    ? userrestaurantrecord  & {
      [P in TrueKeys<S['include']>]:
      P extends 'restaurant'
      ? restaurantGetPayload<S['include'][P]> :
      P extends 'user'
      ? userGetPayload<S['include'][P]> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof userrestaurantrecord ? userrestaurantrecord[P]
: 
      P extends 'restaurant'
      ? restaurantGetPayload<S['select'][P]> :
      P extends 'user'
      ? userGetPayload<S['select'][P]> : never
    }
  : userrestaurantrecord
: userrestaurantrecord


export interface userrestaurantrecordDelegate {
  /**
   * Find zero or one Userrestaurantrecord.
   * @param {FindOneuserrestaurantrecordArgs} args - Arguments to find a Userrestaurantrecord
   * @example
   * // Get one Userrestaurantrecord
   * const userrestaurantrecord = await prisma.userrestaurantrecord.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneuserrestaurantrecordArgs>(
    args: Subset<T, FindOneuserrestaurantrecordArgs>
  ): CheckSelect<T, userrestaurantrecordClient<userrestaurantrecord | null>, userrestaurantrecordClient<userrestaurantrecordGetPayload<T> | null>>
  /**
   * Find zero or more Userrestaurantrecords.
   * @param {FindManyuserrestaurantrecordArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Userrestaurantrecords
   * const userrestaurantrecords = await prisma.userrestaurantrecord.findMany()
   * 
   * // Get first 10 Userrestaurantrecords
   * const userrestaurantrecords = await prisma.userrestaurantrecord.findMany({ first: 10 })
   * 
   * // Only select the `Comment`
   * const userrestaurantrecordWithCommentOnly = await prisma.userrestaurantrecord.findMany({ select: { Comment: true } })
   * 
  **/
  findMany<T extends FindManyuserrestaurantrecordArgs>(
    args?: Subset<T, FindManyuserrestaurantrecordArgs>
  ): CheckSelect<T, Promise<Array<userrestaurantrecord>>, Promise<Array<userrestaurantrecordGetPayload<T>>>>
  /**
   * Create a Userrestaurantrecord.
   * @param {userrestaurantrecordCreateArgs} args - Arguments to create a Userrestaurantrecord.
   * @example
   * // Create one Userrestaurantrecord
   * const user = await prisma.userrestaurantrecord.create({
   *   data: {
   *     // ... data to create a Userrestaurantrecord
   *   }
   * })
   * 
  **/
  create<T extends userrestaurantrecordCreateArgs>(
    args: Subset<T, userrestaurantrecordCreateArgs>
  ): CheckSelect<T, userrestaurantrecordClient<userrestaurantrecord>, userrestaurantrecordClient<userrestaurantrecordGetPayload<T>>>
  /**
   * Delete a Userrestaurantrecord.
   * @param {userrestaurantrecordDeleteArgs} args - Arguments to delete one Userrestaurantrecord.
   * @example
   * // Delete one Userrestaurantrecord
   * const user = await prisma.userrestaurantrecord.delete({
   *   where: {
   *     // ... filter to delete one Userrestaurantrecord
   *   }
   * })
   * 
  **/
  delete<T extends userrestaurantrecordDeleteArgs>(
    args: Subset<T, userrestaurantrecordDeleteArgs>
  ): CheckSelect<T, userrestaurantrecordClient<userrestaurantrecord>, userrestaurantrecordClient<userrestaurantrecordGetPayload<T>>>
  /**
   * Update one Userrestaurantrecord.
   * @param {userrestaurantrecordUpdateArgs} args - Arguments to update one Userrestaurantrecord.
   * @example
   * // Update one Userrestaurantrecord
   * const userrestaurantrecord = await prisma.userrestaurantrecord.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends userrestaurantrecordUpdateArgs>(
    args: Subset<T, userrestaurantrecordUpdateArgs>
  ): CheckSelect<T, userrestaurantrecordClient<userrestaurantrecord>, userrestaurantrecordClient<userrestaurantrecordGetPayload<T>>>
  /**
   * Delete zero or more Userrestaurantrecords.
   * @param {userrestaurantrecordDeleteManyArgs} args - Arguments to filter Userrestaurantrecords to delete.
   * @example
   * // Delete a few Userrestaurantrecords
   * const { count } = await prisma.userrestaurantrecord.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends userrestaurantrecordDeleteManyArgs>(
    args: Subset<T, userrestaurantrecordDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Userrestaurantrecords.
   * @param {userrestaurantrecordUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Userrestaurantrecords
   * const userrestaurantrecord = await prisma.userrestaurantrecord.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends userrestaurantrecordUpdateManyArgs>(
    args: Subset<T, userrestaurantrecordUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Userrestaurantrecord.
   * @param {userrestaurantrecordUpsertArgs} args - Arguments to update or create a Userrestaurantrecord.
   * @example
   * // Update or create a Userrestaurantrecord
   * const userrestaurantrecord = await prisma.userrestaurantrecord.upsert({
   *   create: {
   *     // ... data to create a Userrestaurantrecord
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Userrestaurantrecord we want to update
   *   }
   * })
  **/
  upsert<T extends userrestaurantrecordUpsertArgs>(
    args: Subset<T, userrestaurantrecordUpsertArgs>
  ): CheckSelect<T, userrestaurantrecordClient<userrestaurantrecord>, userrestaurantrecordClient<userrestaurantrecordGetPayload<T>>>
  /**
   * 
   */
  count(args?: Omit<FindManyuserrestaurantrecordArgs, 'select' | 'include'>): Promise<number>
}

export declare class userrestaurantrecordClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  private _collectTimestamps?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  restaurant<T extends restaurantArgs = {}>(args?: Subset<T, restaurantArgs>): CheckSelect<T, restaurantClient<restaurant | null>, restaurantClient<restaurantGetPayload<T> | null>>;

  user<T extends userArgs = {}>(args?: Subset<T, userArgs>): CheckSelect<T, userClient<user | null>, userClient<userGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * userrestaurantrecord findOne
 */
export type FindOneuserrestaurantrecordArgs = {
  /**
   * Select specific fields to fetch from the userrestaurantrecord
  **/
  select?: userrestaurantrecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userrestaurantrecordInclude | null
  /**
   * Filter, which userrestaurantrecord to fetch.
  **/
  where: userrestaurantrecordWhereUniqueInput
}


/**
 * userrestaurantrecord findMany
 */
export type FindManyuserrestaurantrecordArgs = {
  /**
   * Select specific fields to fetch from the userrestaurantrecord
  **/
  select?: userrestaurantrecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userrestaurantrecordInclude | null
  /**
   * Filter, which userrestaurantrecords to fetch.
  **/
  where?: userrestaurantrecordWhereInput | null
  /**
   * Determine the order of the userrestaurantrecords to fetch.
  **/
  orderBy?: userrestaurantrecordOrderByInput | null
  /**
   * Skip the first `n` userrestaurantrecords.
  **/
  skip?: number | null
  /**
   * Get all userrestaurantrecords that come after the userrestaurantrecord you provide with the current order.
  **/
  after?: userrestaurantrecordWhereUniqueInput | null
  /**
   * Get all userrestaurantrecords that come before the userrestaurantrecord you provide with the current order.
  **/
  before?: userrestaurantrecordWhereUniqueInput | null
  /**
   * Get the first `n` userrestaurantrecords.
  **/
  first?: number | null
  /**
   * Get the last `n` userrestaurantrecords.
  **/
  last?: number | null
}


/**
 * userrestaurantrecord create
 */
export type userrestaurantrecordCreateArgs = {
  /**
   * Select specific fields to fetch from the userrestaurantrecord
  **/
  select?: userrestaurantrecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userrestaurantrecordInclude | null
  /**
   * The data needed to create a userrestaurantrecord.
  **/
  data: userrestaurantrecordCreateInput
}


/**
 * userrestaurantrecord update
 */
export type userrestaurantrecordUpdateArgs = {
  /**
   * Select specific fields to fetch from the userrestaurantrecord
  **/
  select?: userrestaurantrecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userrestaurantrecordInclude | null
  /**
   * The data needed to update a userrestaurantrecord.
  **/
  data: userrestaurantrecordUpdateInput
  /**
   * Choose, which userrestaurantrecord to update.
  **/
  where: userrestaurantrecordWhereUniqueInput
}


/**
 * userrestaurantrecord updateMany
 */
export type userrestaurantrecordUpdateManyArgs = {
  data: userrestaurantrecordUpdateManyMutationInput
  where?: userrestaurantrecordWhereInput | null
}


/**
 * userrestaurantrecord upsert
 */
export type userrestaurantrecordUpsertArgs = {
  /**
   * Select specific fields to fetch from the userrestaurantrecord
  **/
  select?: userrestaurantrecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userrestaurantrecordInclude | null
  /**
   * The filter to search for the userrestaurantrecord to update in case it exists.
  **/
  where: userrestaurantrecordWhereUniqueInput
  /**
   * In case the userrestaurantrecord found by the `where` argument doesn't exist, create a new userrestaurantrecord with this data.
  **/
  create: userrestaurantrecordCreateInput
  /**
   * In case the userrestaurantrecord was found with the provided `where` argument, update it with this data.
  **/
  update: userrestaurantrecordUpdateInput
}


/**
 * userrestaurantrecord delete
 */
export type userrestaurantrecordDeleteArgs = {
  /**
   * Select specific fields to fetch from the userrestaurantrecord
  **/
  select?: userrestaurantrecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userrestaurantrecordInclude | null
  /**
   * Filter which userrestaurantrecord to delete.
  **/
  where: userrestaurantrecordWhereUniqueInput
}


/**
 * userrestaurantrecord deleteMany
 */
export type userrestaurantrecordDeleteManyArgs = {
  where?: userrestaurantrecordWhereInput | null
}


/**
 * userrestaurantrecord without action
 */
export type userrestaurantrecordArgs = {
  /**
   * Select specific fields to fetch from the userrestaurantrecord
  **/
  select?: userrestaurantrecordSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: userrestaurantrecordInclude | null
}



/**
 * Deep Input Types
 */


export type restaurantsubcategoryWhereInput = {
  CategoryId?: number | IntFilter | null
  Created?: Date | string | DateTimeFilter | null
  Id?: number | IntFilter | null
  LastModified?: Date | string | DateTimeFilter | null
  Name?: string | StringFilter | null
  restaurant?: restaurantFilter | null
  AND?: Enumerable<restaurantsubcategoryWhereInput> | null
  OR?: Enumerable<restaurantsubcategoryWhereInput> | null
  NOT?: Enumerable<restaurantsubcategoryWhereInput> | null
  restaurantcategory?: restaurantcategoryWhereInput | null
}

export type restaurantcategoryWhereInput = {
  Created?: Date | string | DateTimeFilter | null
  Id?: number | IntFilter | null
  LastModified?: Date | string | DateTimeFilter | null
  Name?: string | StringFilter | null
  restaurant?: restaurantFilter | null
  restaurantsubcategory?: restaurantsubcategoryFilter | null
  AND?: Enumerable<restaurantcategoryWhereInput> | null
  OR?: Enumerable<restaurantcategoryWhereInput> | null
  NOT?: Enumerable<restaurantcategoryWhereInput> | null
}

export type identityWhereInput = {
  ArchivedAt?: Date | string | NullableDateTimeFilter | null
  ConfirmedAt?: Date | string | NullableDateTimeFilter | null
  Created?: Date | string | DateTimeFilter | null
  Email?: string | StringFilter | null
  Id?: number | IntFilter | null
  IsConfirmed?: boolean | BooleanFilter | null
  LastModified?: Date | string | DateTimeFilter | null
  Password?: string | StringFilter | null
  RefreshToken?: string | NullableStringFilter | null
  Username?: string | StringFilter | null
  user?: userFilter | null
  AND?: Enumerable<identityWhereInput> | null
  OR?: Enumerable<identityWhereInput> | null
  NOT?: Enumerable<identityWhereInput> | null
}

export type userWhereInput = {
  Adress?: string | NullableStringFilter | null
  ArchivedAt?: Date | string | NullableDateTimeFilter | null
  Avatar?: string | NullableStringFilter | null
  BornOn?: Date | string | DateTimeFilter | null
  CountryId?: string | NullableStringFilter | null
  Created?: Date | string | DateTimeFilter | null
  FirstName?: string | StringFilter | null
  Id?: number | IntFilter | null
  IdentityId?: number | IntFilter | null
  LastModified?: Date | string | DateTimeFilter | null
  LastName?: string | StringFilter | null
  MiddleName?: string | NullableStringFilter | null
  Role?: number | IntFilter | null
  Sex?: boolean | BooleanFilter | null
  Username?: string | NullableStringFilter | null
  userrestaurantrecord?: userrestaurantrecordFilter | null
  AND?: Enumerable<userWhereInput> | null
  OR?: Enumerable<userWhereInput> | null
  NOT?: Enumerable<userWhereInput> | null
  country?: countryWhereInput | null
  identity?: identityWhereInput | null
}

export type userrestaurantrecordWhereInput = {
  Comment?: string | NullableStringFilter | null
  Created?: Date | string | DateTimeFilter | null
  DateVisited?: Date | string | NullableDateTimeFilter | null
  Id?: number | IntFilter | null
  IsFavorite?: boolean | BooleanFilter | null
  LastModified?: Date | string | DateTimeFilter | null
  RestaurantId?: number | IntFilter | null
  Status?: number | IntFilter | null
  UserId?: number | IntFilter | null
  AND?: Enumerable<userrestaurantrecordWhereInput> | null
  OR?: Enumerable<userrestaurantrecordWhereInput> | null
  NOT?: Enumerable<userrestaurantrecordWhereInput> | null
  restaurant?: restaurantWhereInput | null
  user?: userWhereInput | null
}

export type restaurantWhereInput = {
  Adress?: string | NullableStringFilter | null
  CategoryId?: number | IntFilter | null
  CountryId?: string | NullableStringFilter | null
  Created?: Date | string | DateTimeFilter | null
  Id?: number | IntFilter | null
  Image?: string | NullableStringFilter | null
  LastModified?: Date | string | DateTimeFilter | null
  Name?: string | StringFilter | null
  SubcategoryId?: number | IntFilter | null
  userrestaurantrecord?: userrestaurantrecordFilter | null
  AND?: Enumerable<restaurantWhereInput> | null
  OR?: Enumerable<restaurantWhereInput> | null
  NOT?: Enumerable<restaurantWhereInput> | null
  restaurantcategory?: restaurantcategoryWhereInput | null
  country?: countryWhereInput | null
  restaurantsubcategory?: restaurantsubcategoryWhereInput | null
}

export type countryWhereInput = {
  id?: string | StringFilter | null
  name?: string | NullableStringFilter | null
  restaurant?: restaurantFilter | null
  user?: userFilter | null
  AND?: Enumerable<countryWhereInput> | null
  OR?: Enumerable<countryWhereInput> | null
  NOT?: Enumerable<countryWhereInput> | null
}

export type countryWhereUniqueInput = {
  id?: string | null
}

export type restaurantWhereUniqueInput = {
  CategoryId?: number | null
  CountryId?: string | null
  Id?: number | null
  SubcategoryId?: number | null
}

export type restaurantsubcategoryWhereUniqueInput = {
  CategoryId?: number | null
  Id?: number | null
}

export type userrestaurantrecordWhereUniqueInput = {
  Id?: number | null
  RestaurantId?: number | null
  UserId?: number | null
}

export type userWhereUniqueInput = {
  CountryId?: string | null
  Id?: number | null
  IdentityId?: number | null
}

export type identityWhereUniqueInput = {
  Id?: number | null
}

export type restaurantcategoryWhereUniqueInput = {
  Id?: number | null
}

export type identityCreateWithoutUserInput = {
  ArchivedAt?: Date | string | null
  ConfirmedAt?: Date | string | null
  Created?: Date | string | null
  Email: string
  IsConfirmed: boolean
  LastModified?: Date | string | null
  Password: string
  RefreshToken?: string | null
  Username: string
}

export type identityCreateOneWithoutUserInput = {
  create?: identityCreateWithoutUserInput | null
  connect?: identityWhereUniqueInput | null
}

export type countryCreateWithoutUserInput = {
  id?: string | null
  name?: string | null
  restaurant?: restaurantCreateManyWithoutCountryInput | null
}

export type countryCreateOneWithoutUserInput = {
  create?: countryCreateWithoutUserInput | null
  connect?: countryWhereUniqueInput | null
}

export type userCreateWithoutUserrestaurantrecordInput = {
  Adress?: string | null
  ArchivedAt?: Date | string | null
  Avatar?: string | null
  BornOn: Date | string
  Created: Date | string
  FirstName: string
  LastModified?: Date | string | null
  LastName: string
  MiddleName?: string | null
  Role: number
  Sex: boolean
  Username?: string | null
  country?: countryCreateOneWithoutUserInput | null
  identity: identityCreateOneWithoutUserInput
}

export type userCreateOneWithoutUserrestaurantrecordInput = {
  create?: userCreateWithoutUserrestaurantrecordInput | null
  connect?: userWhereUniqueInput | null
}

export type userrestaurantrecordCreateWithoutRestaurantInput = {
  Comment?: string | null
  Created: Date | string
  DateVisited?: Date | string | null
  IsFavorite: boolean
  LastModified?: Date | string | null
  Status: number
  user: userCreateOneWithoutUserrestaurantrecordInput
}

export type userrestaurantrecordCreateManyWithoutRestaurantInput = {
  create?: Enumerable<userrestaurantrecordCreateWithoutRestaurantInput> | null
  connect?: Enumerable<userrestaurantrecordWhereUniqueInput> | null
}

export type restaurantCreateWithoutRestaurantcategoryInput = {
  Adress?: string | null
  Created: Date | string
  Image?: string | null
  LastModified?: Date | string | null
  Name: string
  country?: countryCreateOneWithoutRestaurantInput | null
  restaurantsubcategory: restaurantsubcategoryCreateOneWithoutRestaurantInput
  userrestaurantrecord?: userrestaurantrecordCreateManyWithoutRestaurantInput | null
}

export type restaurantCreateManyWithoutRestaurantcategoryInput = {
  create?: Enumerable<restaurantCreateWithoutRestaurantcategoryInput> | null
  connect?: Enumerable<restaurantWhereUniqueInput> | null
}

export type restaurantcategoryCreateWithoutRestaurantsubcategoryInput = {
  Created: Date | string
  LastModified?: Date | string | null
  Name: string
  restaurant?: restaurantCreateManyWithoutRestaurantcategoryInput | null
}

export type restaurantcategoryCreateOneWithoutRestaurantsubcategoryInput = {
  create?: restaurantcategoryCreateWithoutRestaurantsubcategoryInput | null
  connect?: restaurantcategoryWhereUniqueInput | null
}

export type restaurantsubcategoryCreateWithoutRestaurantInput = {
  Created: Date | string
  LastModified?: Date | string | null
  Name: string
  restaurantcategory: restaurantcategoryCreateOneWithoutRestaurantsubcategoryInput
}

export type restaurantsubcategoryCreateOneWithoutRestaurantInput = {
  create?: restaurantsubcategoryCreateWithoutRestaurantInput | null
  connect?: restaurantsubcategoryWhereUniqueInput | null
}

export type restaurantCreateWithoutUserrestaurantrecordInput = {
  Adress?: string | null
  Created: Date | string
  Image?: string | null
  LastModified?: Date | string | null
  Name: string
  restaurantcategory: restaurantcategoryCreateOneWithoutRestaurantInput
  country?: countryCreateOneWithoutRestaurantInput | null
  restaurantsubcategory: restaurantsubcategoryCreateOneWithoutRestaurantInput
}

export type restaurantCreateOneWithoutUserrestaurantrecordInput = {
  create?: restaurantCreateWithoutUserrestaurantrecordInput | null
  connect?: restaurantWhereUniqueInput | null
}

export type userrestaurantrecordCreateWithoutUserInput = {
  Comment?: string | null
  Created: Date | string
  DateVisited?: Date | string | null
  IsFavorite: boolean
  LastModified?: Date | string | null
  Status: number
  restaurant: restaurantCreateOneWithoutUserrestaurantrecordInput
}

export type userrestaurantrecordCreateManyWithoutUserInput = {
  create?: Enumerable<userrestaurantrecordCreateWithoutUserInput> | null
  connect?: Enumerable<userrestaurantrecordWhereUniqueInput> | null
}

export type userCreateWithoutCountryInput = {
  Adress?: string | null
  ArchivedAt?: Date | string | null
  Avatar?: string | null
  BornOn: Date | string
  Created: Date | string
  FirstName: string
  LastModified?: Date | string | null
  LastName: string
  MiddleName?: string | null
  Role: number
  Sex: boolean
  Username?: string | null
  identity: identityCreateOneWithoutUserInput
  userrestaurantrecord?: userrestaurantrecordCreateManyWithoutUserInput | null
}

export type userCreateManyWithoutCountryInput = {
  create?: Enumerable<userCreateWithoutCountryInput> | null
  connect?: Enumerable<userWhereUniqueInput> | null
}

export type countryCreateWithoutRestaurantInput = {
  id?: string | null
  name?: string | null
  user?: userCreateManyWithoutCountryInput | null
}

export type countryCreateOneWithoutRestaurantInput = {
  create?: countryCreateWithoutRestaurantInput | null
  connect?: countryWhereUniqueInput | null
}

export type restaurantCreateWithoutRestaurantsubcategoryInput = {
  Adress?: string | null
  Created: Date | string
  Image?: string | null
  LastModified?: Date | string | null
  Name: string
  restaurantcategory: restaurantcategoryCreateOneWithoutRestaurantInput
  country?: countryCreateOneWithoutRestaurantInput | null
  userrestaurantrecord?: userrestaurantrecordCreateManyWithoutRestaurantInput | null
}

export type restaurantCreateManyWithoutRestaurantsubcategoryInput = {
  create?: Enumerable<restaurantCreateWithoutRestaurantsubcategoryInput> | null
  connect?: Enumerable<restaurantWhereUniqueInput> | null
}

export type restaurantsubcategoryCreateWithoutRestaurantcategoryInput = {
  Created: Date | string
  LastModified?: Date | string | null
  Name: string
  restaurant?: restaurantCreateManyWithoutRestaurantsubcategoryInput | null
}

export type restaurantsubcategoryCreateManyWithoutRestaurantcategoryInput = {
  create?: Enumerable<restaurantsubcategoryCreateWithoutRestaurantcategoryInput> | null
  connect?: Enumerable<restaurantsubcategoryWhereUniqueInput> | null
}

export type restaurantcategoryCreateWithoutRestaurantInput = {
  Created: Date | string
  LastModified?: Date | string | null
  Name: string
  restaurantsubcategory?: restaurantsubcategoryCreateManyWithoutRestaurantcategoryInput | null
}

export type restaurantcategoryCreateOneWithoutRestaurantInput = {
  create?: restaurantcategoryCreateWithoutRestaurantInput | null
  connect?: restaurantcategoryWhereUniqueInput | null
}

export type restaurantCreateWithoutCountryInput = {
  Adress?: string | null
  Created: Date | string
  Image?: string | null
  LastModified?: Date | string | null
  Name: string
  restaurantcategory: restaurantcategoryCreateOneWithoutRestaurantInput
  restaurantsubcategory: restaurantsubcategoryCreateOneWithoutRestaurantInput
  userrestaurantrecord?: userrestaurantrecordCreateManyWithoutRestaurantInput | null
}

export type restaurantCreateManyWithoutCountryInput = {
  create?: Enumerable<restaurantCreateWithoutCountryInput> | null
  connect?: Enumerable<restaurantWhereUniqueInput> | null
}

export type countryCreateInput = {
  id?: string | null
  name?: string | null
  restaurant?: restaurantCreateManyWithoutCountryInput | null
  user?: userCreateManyWithoutCountryInput | null
}

export type identityUpdateWithoutUserDataInput = {
  ArchivedAt?: Date | string | null
  ConfirmedAt?: Date | string | null
  Created?: Date | string | null
  Email?: string | null
  Id?: number | null
  IsConfirmed?: boolean | null
  LastModified?: Date | string | null
  Password?: string | null
  RefreshToken?: string | null
  Username?: string | null
}

export type identityUpsertWithoutUserInput = {
  update: identityUpdateWithoutUserDataInput
  create: identityCreateWithoutUserInput
}

export type identityUpdateOneRequiredWithoutUserInput = {
  create?: identityCreateWithoutUserInput | null
  connect?: identityWhereUniqueInput | null
  update?: identityUpdateWithoutUserDataInput | null
  upsert?: identityUpsertWithoutUserInput | null
}

export type countryUpdateWithoutUserDataInput = {
  id?: string | null
  name?: string | null
  restaurant?: restaurantUpdateManyWithoutCountryInput | null
}

export type countryUpsertWithoutUserInput = {
  update: countryUpdateWithoutUserDataInput
  create: countryCreateWithoutUserInput
}

export type countryUpdateOneWithoutUserInput = {
  create?: countryCreateWithoutUserInput | null
  connect?: countryWhereUniqueInput | null
  disconnect?: boolean | null
  delete?: boolean | null
  update?: countryUpdateWithoutUserDataInput | null
  upsert?: countryUpsertWithoutUserInput | null
}

export type userUpdateWithoutUserrestaurantrecordDataInput = {
  Adress?: string | null
  ArchivedAt?: Date | string | null
  Avatar?: string | null
  BornOn?: Date | string | null
  Created?: Date | string | null
  FirstName?: string | null
  Id?: number | null
  LastModified?: Date | string | null
  LastName?: string | null
  MiddleName?: string | null
  Role?: number | null
  Sex?: boolean | null
  Username?: string | null
  country?: countryUpdateOneWithoutUserInput | null
  identity?: identityUpdateOneRequiredWithoutUserInput | null
}

export type userUpsertWithoutUserrestaurantrecordInput = {
  update: userUpdateWithoutUserrestaurantrecordDataInput
  create: userCreateWithoutUserrestaurantrecordInput
}

export type userUpdateOneRequiredWithoutUserrestaurantrecordInput = {
  create?: userCreateWithoutUserrestaurantrecordInput | null
  connect?: userWhereUniqueInput | null
  update?: userUpdateWithoutUserrestaurantrecordDataInput | null
  upsert?: userUpsertWithoutUserrestaurantrecordInput | null
}

export type userrestaurantrecordUpdateWithoutRestaurantDataInput = {
  Comment?: string | null
  Created?: Date | string | null
  DateVisited?: Date | string | null
  Id?: number | null
  IsFavorite?: boolean | null
  LastModified?: Date | string | null
  Status?: number | null
  user?: userUpdateOneRequiredWithoutUserrestaurantrecordInput | null
}

export type userrestaurantrecordUpdateWithWhereUniqueWithoutRestaurantInput = {
  where: userrestaurantrecordWhereUniqueInput
  data: userrestaurantrecordUpdateWithoutRestaurantDataInput
}

export type userrestaurantrecordScalarWhereInput = {
  Comment?: string | NullableStringFilter | null
  Created?: Date | string | DateTimeFilter | null
  DateVisited?: Date | string | NullableDateTimeFilter | null
  Id?: number | IntFilter | null
  IsFavorite?: boolean | BooleanFilter | null
  LastModified?: Date | string | DateTimeFilter | null
  RestaurantId?: number | IntFilter | null
  Status?: number | IntFilter | null
  UserId?: number | IntFilter | null
  AND?: Enumerable<userrestaurantrecordScalarWhereInput> | null
  OR?: Enumerable<userrestaurantrecordScalarWhereInput> | null
  NOT?: Enumerable<userrestaurantrecordScalarWhereInput> | null
}

export type userrestaurantrecordUpdateManyDataInput = {
  Comment?: string | null
  Created?: Date | string | null
  DateVisited?: Date | string | null
  Id?: number | null
  IsFavorite?: boolean | null
  LastModified?: Date | string | null
  Status?: number | null
}

export type userrestaurantrecordUpdateManyWithWhereNestedInput = {
  where: userrestaurantrecordScalarWhereInput
  data: userrestaurantrecordUpdateManyDataInput
}

export type userrestaurantrecordUpsertWithWhereUniqueWithoutRestaurantInput = {
  where: userrestaurantrecordWhereUniqueInput
  update: userrestaurantrecordUpdateWithoutRestaurantDataInput
  create: userrestaurantrecordCreateWithoutRestaurantInput
}

export type userrestaurantrecordUpdateManyWithoutRestaurantInput = {
  create?: Enumerable<userrestaurantrecordCreateWithoutRestaurantInput> | null
  connect?: Enumerable<userrestaurantrecordWhereUniqueInput> | null
  set?: Enumerable<userrestaurantrecordWhereUniqueInput> | null
  disconnect?: Enumerable<userrestaurantrecordWhereUniqueInput> | null
  delete?: Enumerable<userrestaurantrecordWhereUniqueInput> | null
  update?: Enumerable<userrestaurantrecordUpdateWithWhereUniqueWithoutRestaurantInput> | null
  updateMany?: Enumerable<userrestaurantrecordUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<userrestaurantrecordScalarWhereInput> | null
  upsert?: Enumerable<userrestaurantrecordUpsertWithWhereUniqueWithoutRestaurantInput> | null
}

export type restaurantUpdateWithoutRestaurantcategoryDataInput = {
  Adress?: string | null
  Created?: Date | string | null
  Id?: number | null
  Image?: string | null
  LastModified?: Date | string | null
  Name?: string | null
  country?: countryUpdateOneWithoutRestaurantInput | null
  restaurantsubcategory?: restaurantsubcategoryUpdateOneRequiredWithoutRestaurantInput | null
  userrestaurantrecord?: userrestaurantrecordUpdateManyWithoutRestaurantInput | null
}

export type restaurantUpdateWithWhereUniqueWithoutRestaurantcategoryInput = {
  where: restaurantWhereUniqueInput
  data: restaurantUpdateWithoutRestaurantcategoryDataInput
}

export type restaurantScalarWhereInput = {
  Adress?: string | NullableStringFilter | null
  CategoryId?: number | IntFilter | null
  CountryId?: string | NullableStringFilter | null
  Created?: Date | string | DateTimeFilter | null
  Id?: number | IntFilter | null
  Image?: string | NullableStringFilter | null
  LastModified?: Date | string | DateTimeFilter | null
  Name?: string | StringFilter | null
  SubcategoryId?: number | IntFilter | null
  userrestaurantrecord?: userrestaurantrecordFilter | null
  AND?: Enumerable<restaurantScalarWhereInput> | null
  OR?: Enumerable<restaurantScalarWhereInput> | null
  NOT?: Enumerable<restaurantScalarWhereInput> | null
}

export type restaurantUpdateManyDataInput = {
  Adress?: string | null
  Created?: Date | string | null
  Id?: number | null
  Image?: string | null
  LastModified?: Date | string | null
  Name?: string | null
}

export type restaurantUpdateManyWithWhereNestedInput = {
  where: restaurantScalarWhereInput
  data: restaurantUpdateManyDataInput
}

export type restaurantUpsertWithWhereUniqueWithoutRestaurantcategoryInput = {
  where: restaurantWhereUniqueInput
  update: restaurantUpdateWithoutRestaurantcategoryDataInput
  create: restaurantCreateWithoutRestaurantcategoryInput
}

export type restaurantUpdateManyWithoutRestaurantcategoryInput = {
  create?: Enumerable<restaurantCreateWithoutRestaurantcategoryInput> | null
  connect?: Enumerable<restaurantWhereUniqueInput> | null
  set?: Enumerable<restaurantWhereUniqueInput> | null
  disconnect?: Enumerable<restaurantWhereUniqueInput> | null
  delete?: Enumerable<restaurantWhereUniqueInput> | null
  update?: Enumerable<restaurantUpdateWithWhereUniqueWithoutRestaurantcategoryInput> | null
  updateMany?: Enumerable<restaurantUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<restaurantScalarWhereInput> | null
  upsert?: Enumerable<restaurantUpsertWithWhereUniqueWithoutRestaurantcategoryInput> | null
}

export type restaurantcategoryUpdateWithoutRestaurantsubcategoryDataInput = {
  Created?: Date | string | null
  Id?: number | null
  LastModified?: Date | string | null
  Name?: string | null
  restaurant?: restaurantUpdateManyWithoutRestaurantcategoryInput | null
}

export type restaurantcategoryUpsertWithoutRestaurantsubcategoryInput = {
  update: restaurantcategoryUpdateWithoutRestaurantsubcategoryDataInput
  create: restaurantcategoryCreateWithoutRestaurantsubcategoryInput
}

export type restaurantcategoryUpdateOneRequiredWithoutRestaurantsubcategoryInput = {
  create?: restaurantcategoryCreateWithoutRestaurantsubcategoryInput | null
  connect?: restaurantcategoryWhereUniqueInput | null
  update?: restaurantcategoryUpdateWithoutRestaurantsubcategoryDataInput | null
  upsert?: restaurantcategoryUpsertWithoutRestaurantsubcategoryInput | null
}

export type restaurantsubcategoryUpdateWithoutRestaurantDataInput = {
  Created?: Date | string | null
  Id?: number | null
  LastModified?: Date | string | null
  Name?: string | null
  restaurantcategory?: restaurantcategoryUpdateOneRequiredWithoutRestaurantsubcategoryInput | null
}

export type restaurantsubcategoryUpsertWithoutRestaurantInput = {
  update: restaurantsubcategoryUpdateWithoutRestaurantDataInput
  create: restaurantsubcategoryCreateWithoutRestaurantInput
}

export type restaurantsubcategoryUpdateOneRequiredWithoutRestaurantInput = {
  create?: restaurantsubcategoryCreateWithoutRestaurantInput | null
  connect?: restaurantsubcategoryWhereUniqueInput | null
  update?: restaurantsubcategoryUpdateWithoutRestaurantDataInput | null
  upsert?: restaurantsubcategoryUpsertWithoutRestaurantInput | null
}

export type restaurantUpdateWithoutUserrestaurantrecordDataInput = {
  Adress?: string | null
  Created?: Date | string | null
  Id?: number | null
  Image?: string | null
  LastModified?: Date | string | null
  Name?: string | null
  restaurantcategory?: restaurantcategoryUpdateOneRequiredWithoutRestaurantInput | null
  country?: countryUpdateOneWithoutRestaurantInput | null
  restaurantsubcategory?: restaurantsubcategoryUpdateOneRequiredWithoutRestaurantInput | null
}

export type restaurantUpsertWithoutUserrestaurantrecordInput = {
  update: restaurantUpdateWithoutUserrestaurantrecordDataInput
  create: restaurantCreateWithoutUserrestaurantrecordInput
}

export type restaurantUpdateOneRequiredWithoutUserrestaurantrecordInput = {
  create?: restaurantCreateWithoutUserrestaurantrecordInput | null
  connect?: restaurantWhereUniqueInput | null
  update?: restaurantUpdateWithoutUserrestaurantrecordDataInput | null
  upsert?: restaurantUpsertWithoutUserrestaurantrecordInput | null
}

export type userrestaurantrecordUpdateWithoutUserDataInput = {
  Comment?: string | null
  Created?: Date | string | null
  DateVisited?: Date | string | null
  Id?: number | null
  IsFavorite?: boolean | null
  LastModified?: Date | string | null
  Status?: number | null
  restaurant?: restaurantUpdateOneRequiredWithoutUserrestaurantrecordInput | null
}

export type userrestaurantrecordUpdateWithWhereUniqueWithoutUserInput = {
  where: userrestaurantrecordWhereUniqueInput
  data: userrestaurantrecordUpdateWithoutUserDataInput
}

export type userrestaurantrecordUpsertWithWhereUniqueWithoutUserInput = {
  where: userrestaurantrecordWhereUniqueInput
  update: userrestaurantrecordUpdateWithoutUserDataInput
  create: userrestaurantrecordCreateWithoutUserInput
}

export type userrestaurantrecordUpdateManyWithoutUserInput = {
  create?: Enumerable<userrestaurantrecordCreateWithoutUserInput> | null
  connect?: Enumerable<userrestaurantrecordWhereUniqueInput> | null
  set?: Enumerable<userrestaurantrecordWhereUniqueInput> | null
  disconnect?: Enumerable<userrestaurantrecordWhereUniqueInput> | null
  delete?: Enumerable<userrestaurantrecordWhereUniqueInput> | null
  update?: Enumerable<userrestaurantrecordUpdateWithWhereUniqueWithoutUserInput> | null
  updateMany?: Enumerable<userrestaurantrecordUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<userrestaurantrecordScalarWhereInput> | null
  upsert?: Enumerable<userrestaurantrecordUpsertWithWhereUniqueWithoutUserInput> | null
}

export type userUpdateWithoutCountryDataInput = {
  Adress?: string | null
  ArchivedAt?: Date | string | null
  Avatar?: string | null
  BornOn?: Date | string | null
  Created?: Date | string | null
  FirstName?: string | null
  Id?: number | null
  LastModified?: Date | string | null
  LastName?: string | null
  MiddleName?: string | null
  Role?: number | null
  Sex?: boolean | null
  Username?: string | null
  identity?: identityUpdateOneRequiredWithoutUserInput | null
  userrestaurantrecord?: userrestaurantrecordUpdateManyWithoutUserInput | null
}

export type userUpdateWithWhereUniqueWithoutCountryInput = {
  where: userWhereUniqueInput
  data: userUpdateWithoutCountryDataInput
}

export type userScalarWhereInput = {
  Adress?: string | NullableStringFilter | null
  ArchivedAt?: Date | string | NullableDateTimeFilter | null
  Avatar?: string | NullableStringFilter | null
  BornOn?: Date | string | DateTimeFilter | null
  CountryId?: string | NullableStringFilter | null
  Created?: Date | string | DateTimeFilter | null
  FirstName?: string | StringFilter | null
  Id?: number | IntFilter | null
  IdentityId?: number | IntFilter | null
  LastModified?: Date | string | DateTimeFilter | null
  LastName?: string | StringFilter | null
  MiddleName?: string | NullableStringFilter | null
  Role?: number | IntFilter | null
  Sex?: boolean | BooleanFilter | null
  Username?: string | NullableStringFilter | null
  userrestaurantrecord?: userrestaurantrecordFilter | null
  AND?: Enumerable<userScalarWhereInput> | null
  OR?: Enumerable<userScalarWhereInput> | null
  NOT?: Enumerable<userScalarWhereInput> | null
}

export type userUpdateManyDataInput = {
  Adress?: string | null
  ArchivedAt?: Date | string | null
  Avatar?: string | null
  BornOn?: Date | string | null
  Created?: Date | string | null
  FirstName?: string | null
  Id?: number | null
  LastModified?: Date | string | null
  LastName?: string | null
  MiddleName?: string | null
  Role?: number | null
  Sex?: boolean | null
  Username?: string | null
}

export type userUpdateManyWithWhereNestedInput = {
  where: userScalarWhereInput
  data: userUpdateManyDataInput
}

export type userUpsertWithWhereUniqueWithoutCountryInput = {
  where: userWhereUniqueInput
  update: userUpdateWithoutCountryDataInput
  create: userCreateWithoutCountryInput
}

export type userUpdateManyWithoutCountryInput = {
  create?: Enumerable<userCreateWithoutCountryInput> | null
  connect?: Enumerable<userWhereUniqueInput> | null
  set?: Enumerable<userWhereUniqueInput> | null
  disconnect?: Enumerable<userWhereUniqueInput> | null
  delete?: Enumerable<userWhereUniqueInput> | null
  update?: Enumerable<userUpdateWithWhereUniqueWithoutCountryInput> | null
  updateMany?: Enumerable<userUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<userScalarWhereInput> | null
  upsert?: Enumerable<userUpsertWithWhereUniqueWithoutCountryInput> | null
}

export type countryUpdateWithoutRestaurantDataInput = {
  id?: string | null
  name?: string | null
  user?: userUpdateManyWithoutCountryInput | null
}

export type countryUpsertWithoutRestaurantInput = {
  update: countryUpdateWithoutRestaurantDataInput
  create: countryCreateWithoutRestaurantInput
}

export type countryUpdateOneWithoutRestaurantInput = {
  create?: countryCreateWithoutRestaurantInput | null
  connect?: countryWhereUniqueInput | null
  disconnect?: boolean | null
  delete?: boolean | null
  update?: countryUpdateWithoutRestaurantDataInput | null
  upsert?: countryUpsertWithoutRestaurantInput | null
}

export type restaurantUpdateWithoutRestaurantsubcategoryDataInput = {
  Adress?: string | null
  Created?: Date | string | null
  Id?: number | null
  Image?: string | null
  LastModified?: Date | string | null
  Name?: string | null
  restaurantcategory?: restaurantcategoryUpdateOneRequiredWithoutRestaurantInput | null
  country?: countryUpdateOneWithoutRestaurantInput | null
  userrestaurantrecord?: userrestaurantrecordUpdateManyWithoutRestaurantInput | null
}

export type restaurantUpdateWithWhereUniqueWithoutRestaurantsubcategoryInput = {
  where: restaurantWhereUniqueInput
  data: restaurantUpdateWithoutRestaurantsubcategoryDataInput
}

export type restaurantUpsertWithWhereUniqueWithoutRestaurantsubcategoryInput = {
  where: restaurantWhereUniqueInput
  update: restaurantUpdateWithoutRestaurantsubcategoryDataInput
  create: restaurantCreateWithoutRestaurantsubcategoryInput
}

export type restaurantUpdateManyWithoutRestaurantsubcategoryInput = {
  create?: Enumerable<restaurantCreateWithoutRestaurantsubcategoryInput> | null
  connect?: Enumerable<restaurantWhereUniqueInput> | null
  set?: Enumerable<restaurantWhereUniqueInput> | null
  disconnect?: Enumerable<restaurantWhereUniqueInput> | null
  delete?: Enumerable<restaurantWhereUniqueInput> | null
  update?: Enumerable<restaurantUpdateWithWhereUniqueWithoutRestaurantsubcategoryInput> | null
  updateMany?: Enumerable<restaurantUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<restaurantScalarWhereInput> | null
  upsert?: Enumerable<restaurantUpsertWithWhereUniqueWithoutRestaurantsubcategoryInput> | null
}

export type restaurantsubcategoryUpdateWithoutRestaurantcategoryDataInput = {
  Created?: Date | string | null
  Id?: number | null
  LastModified?: Date | string | null
  Name?: string | null
  restaurant?: restaurantUpdateManyWithoutRestaurantsubcategoryInput | null
}

export type restaurantsubcategoryUpdateWithWhereUniqueWithoutRestaurantcategoryInput = {
  where: restaurantsubcategoryWhereUniqueInput
  data: restaurantsubcategoryUpdateWithoutRestaurantcategoryDataInput
}

export type restaurantsubcategoryScalarWhereInput = {
  CategoryId?: number | IntFilter | null
  Created?: Date | string | DateTimeFilter | null
  Id?: number | IntFilter | null
  LastModified?: Date | string | DateTimeFilter | null
  Name?: string | StringFilter | null
  restaurant?: restaurantFilter | null
  AND?: Enumerable<restaurantsubcategoryScalarWhereInput> | null
  OR?: Enumerable<restaurantsubcategoryScalarWhereInput> | null
  NOT?: Enumerable<restaurantsubcategoryScalarWhereInput> | null
}

export type restaurantsubcategoryUpdateManyDataInput = {
  Created?: Date | string | null
  Id?: number | null
  LastModified?: Date | string | null
  Name?: string | null
}

export type restaurantsubcategoryUpdateManyWithWhereNestedInput = {
  where: restaurantsubcategoryScalarWhereInput
  data: restaurantsubcategoryUpdateManyDataInput
}

export type restaurantsubcategoryUpsertWithWhereUniqueWithoutRestaurantcategoryInput = {
  where: restaurantsubcategoryWhereUniqueInput
  update: restaurantsubcategoryUpdateWithoutRestaurantcategoryDataInput
  create: restaurantsubcategoryCreateWithoutRestaurantcategoryInput
}

export type restaurantsubcategoryUpdateManyWithoutRestaurantcategoryInput = {
  create?: Enumerable<restaurantsubcategoryCreateWithoutRestaurantcategoryInput> | null
  connect?: Enumerable<restaurantsubcategoryWhereUniqueInput> | null
  set?: Enumerable<restaurantsubcategoryWhereUniqueInput> | null
  disconnect?: Enumerable<restaurantsubcategoryWhereUniqueInput> | null
  delete?: Enumerable<restaurantsubcategoryWhereUniqueInput> | null
  update?: Enumerable<restaurantsubcategoryUpdateWithWhereUniqueWithoutRestaurantcategoryInput> | null
  updateMany?: Enumerable<restaurantsubcategoryUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<restaurantsubcategoryScalarWhereInput> | null
  upsert?: Enumerable<restaurantsubcategoryUpsertWithWhereUniqueWithoutRestaurantcategoryInput> | null
}

export type restaurantcategoryUpdateWithoutRestaurantDataInput = {
  Created?: Date | string | null
  Id?: number | null
  LastModified?: Date | string | null
  Name?: string | null
  restaurantsubcategory?: restaurantsubcategoryUpdateManyWithoutRestaurantcategoryInput | null
}

export type restaurantcategoryUpsertWithoutRestaurantInput = {
  update: restaurantcategoryUpdateWithoutRestaurantDataInput
  create: restaurantcategoryCreateWithoutRestaurantInput
}

export type restaurantcategoryUpdateOneRequiredWithoutRestaurantInput = {
  create?: restaurantcategoryCreateWithoutRestaurantInput | null
  connect?: restaurantcategoryWhereUniqueInput | null
  update?: restaurantcategoryUpdateWithoutRestaurantDataInput | null
  upsert?: restaurantcategoryUpsertWithoutRestaurantInput | null
}

export type restaurantUpdateWithoutCountryDataInput = {
  Adress?: string | null
  Created?: Date | string | null
  Id?: number | null
  Image?: string | null
  LastModified?: Date | string | null
  Name?: string | null
  restaurantcategory?: restaurantcategoryUpdateOneRequiredWithoutRestaurantInput | null
  restaurantsubcategory?: restaurantsubcategoryUpdateOneRequiredWithoutRestaurantInput | null
  userrestaurantrecord?: userrestaurantrecordUpdateManyWithoutRestaurantInput | null
}

export type restaurantUpdateWithWhereUniqueWithoutCountryInput = {
  where: restaurantWhereUniqueInput
  data: restaurantUpdateWithoutCountryDataInput
}

export type restaurantUpsertWithWhereUniqueWithoutCountryInput = {
  where: restaurantWhereUniqueInput
  update: restaurantUpdateWithoutCountryDataInput
  create: restaurantCreateWithoutCountryInput
}

export type restaurantUpdateManyWithoutCountryInput = {
  create?: Enumerable<restaurantCreateWithoutCountryInput> | null
  connect?: Enumerable<restaurantWhereUniqueInput> | null
  set?: Enumerable<restaurantWhereUniqueInput> | null
  disconnect?: Enumerable<restaurantWhereUniqueInput> | null
  delete?: Enumerable<restaurantWhereUniqueInput> | null
  update?: Enumerable<restaurantUpdateWithWhereUniqueWithoutCountryInput> | null
  updateMany?: Enumerable<restaurantUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<restaurantScalarWhereInput> | null
  upsert?: Enumerable<restaurantUpsertWithWhereUniqueWithoutCountryInput> | null
}

export type countryUpdateInput = {
  id?: string | null
  name?: string | null
  restaurant?: restaurantUpdateManyWithoutCountryInput | null
  user?: userUpdateManyWithoutCountryInput | null
}

export type countryUpdateManyMutationInput = {
  id?: string | null
  name?: string | null
}

export type userCreateWithoutIdentityInput = {
  Adress?: string | null
  ArchivedAt?: Date | string | null
  Avatar?: string | null
  BornOn: Date | string
  Created: Date | string
  FirstName: string
  LastModified?: Date | string | null
  LastName: string
  MiddleName?: string | null
  Role: number
  Sex: boolean
  Username?: string | null
  country?: countryCreateOneWithoutUserInput | null
  userrestaurantrecord?: userrestaurantrecordCreateManyWithoutUserInput | null
}

export type userCreateManyWithoutIdentityInput = {
  create?: Enumerable<userCreateWithoutIdentityInput> | null
  connect?: Enumerable<userWhereUniqueInput> | null
}

export type identityCreateInput = {
  ArchivedAt?: Date | string | null
  ConfirmedAt?: Date | string | null
  Created?: Date | string | null
  Email: string
  IsConfirmed: boolean
  LastModified?: Date | string | null
  Password: string
  RefreshToken?: string | null
  Username: string
  user?: userCreateManyWithoutIdentityInput | null
}

export type userUpdateWithoutIdentityDataInput = {
  Adress?: string | null
  ArchivedAt?: Date | string | null
  Avatar?: string | null
  BornOn?: Date | string | null
  Created?: Date | string | null
  FirstName?: string | null
  Id?: number | null
  LastModified?: Date | string | null
  LastName?: string | null
  MiddleName?: string | null
  Role?: number | null
  Sex?: boolean | null
  Username?: string | null
  country?: countryUpdateOneWithoutUserInput | null
  userrestaurantrecord?: userrestaurantrecordUpdateManyWithoutUserInput | null
}

export type userUpdateWithWhereUniqueWithoutIdentityInput = {
  where: userWhereUniqueInput
  data: userUpdateWithoutIdentityDataInput
}

export type userUpsertWithWhereUniqueWithoutIdentityInput = {
  where: userWhereUniqueInput
  update: userUpdateWithoutIdentityDataInput
  create: userCreateWithoutIdentityInput
}

export type userUpdateManyWithoutIdentityInput = {
  create?: Enumerable<userCreateWithoutIdentityInput> | null
  connect?: Enumerable<userWhereUniqueInput> | null
  set?: Enumerable<userWhereUniqueInput> | null
  disconnect?: Enumerable<userWhereUniqueInput> | null
  delete?: Enumerable<userWhereUniqueInput> | null
  update?: Enumerable<userUpdateWithWhereUniqueWithoutIdentityInput> | null
  updateMany?: Enumerable<userUpdateManyWithWhereNestedInput> | null
  deleteMany?: Enumerable<userScalarWhereInput> | null
  upsert?: Enumerable<userUpsertWithWhereUniqueWithoutIdentityInput> | null
}

export type identityUpdateInput = {
  ArchivedAt?: Date | string | null
  ConfirmedAt?: Date | string | null
  Created?: Date | string | null
  Email?: string | null
  Id?: number | null
  IsConfirmed?: boolean | null
  LastModified?: Date | string | null
  Password?: string | null
  RefreshToken?: string | null
  Username?: string | null
  user?: userUpdateManyWithoutIdentityInput | null
}

export type identityUpdateManyMutationInput = {
  ArchivedAt?: Date | string | null
  ConfirmedAt?: Date | string | null
  Created?: Date | string | null
  Email?: string | null
  Id?: number | null
  IsConfirmed?: boolean | null
  LastModified?: Date | string | null
  Password?: string | null
  RefreshToken?: string | null
  Username?: string | null
}

export type restaurantCreateInput = {
  Adress?: string | null
  Created: Date | string
  Image?: string | null
  LastModified?: Date | string | null
  Name: string
  restaurantcategory: restaurantcategoryCreateOneWithoutRestaurantInput
  country?: countryCreateOneWithoutRestaurantInput | null
  restaurantsubcategory: restaurantsubcategoryCreateOneWithoutRestaurantInput
  userrestaurantrecord?: userrestaurantrecordCreateManyWithoutRestaurantInput | null
}

export type restaurantUpdateInput = {
  Adress?: string | null
  Created?: Date | string | null
  Id?: number | null
  Image?: string | null
  LastModified?: Date | string | null
  Name?: string | null
  restaurantcategory?: restaurantcategoryUpdateOneRequiredWithoutRestaurantInput | null
  country?: countryUpdateOneWithoutRestaurantInput | null
  restaurantsubcategory?: restaurantsubcategoryUpdateOneRequiredWithoutRestaurantInput | null
  userrestaurantrecord?: userrestaurantrecordUpdateManyWithoutRestaurantInput | null
}

export type restaurantUpdateManyMutationInput = {
  Adress?: string | null
  Created?: Date | string | null
  Id?: number | null
  Image?: string | null
  LastModified?: Date | string | null
  Name?: string | null
}

export type restaurantcategoryCreateInput = {
  Created: Date | string
  LastModified?: Date | string | null
  Name: string
  restaurant?: restaurantCreateManyWithoutRestaurantcategoryInput | null
  restaurantsubcategory?: restaurantsubcategoryCreateManyWithoutRestaurantcategoryInput | null
}

export type restaurantcategoryUpdateInput = {
  Created?: Date | string | null
  Id?: number | null
  LastModified?: Date | string | null
  Name?: string | null
  restaurant?: restaurantUpdateManyWithoutRestaurantcategoryInput | null
  restaurantsubcategory?: restaurantsubcategoryUpdateManyWithoutRestaurantcategoryInput | null
}

export type restaurantcategoryUpdateManyMutationInput = {
  Created?: Date | string | null
  Id?: number | null
  LastModified?: Date | string | null
  Name?: string | null
}

export type restaurantsubcategoryCreateInput = {
  Created: Date | string
  LastModified?: Date | string | null
  Name: string
  restaurantcategory: restaurantcategoryCreateOneWithoutRestaurantsubcategoryInput
  restaurant?: restaurantCreateManyWithoutRestaurantsubcategoryInput | null
}

export type restaurantsubcategoryUpdateInput = {
  Created?: Date | string | null
  Id?: number | null
  LastModified?: Date | string | null
  Name?: string | null
  restaurantcategory?: restaurantcategoryUpdateOneRequiredWithoutRestaurantsubcategoryInput | null
  restaurant?: restaurantUpdateManyWithoutRestaurantsubcategoryInput | null
}

export type restaurantsubcategoryUpdateManyMutationInput = {
  Created?: Date | string | null
  Id?: number | null
  LastModified?: Date | string | null
  Name?: string | null
}

export type userCreateInput = {
  Adress?: string | null
  ArchivedAt?: Date | string | null
  Avatar?: string | null
  BornOn: Date | string
  Created: Date | string
  FirstName: string
  LastModified?: Date | string | null
  LastName: string
  MiddleName?: string | null
  Role: number
  Sex: boolean
  Username?: string | null
  country?: countryCreateOneWithoutUserInput | null
  identity: identityCreateOneWithoutUserInput
  userrestaurantrecord?: userrestaurantrecordCreateManyWithoutUserInput | null
}

export type userUpdateInput = {
  Adress?: string | null
  ArchivedAt?: Date | string | null
  Avatar?: string | null
  BornOn?: Date | string | null
  Created?: Date | string | null
  FirstName?: string | null
  Id?: number | null
  LastModified?: Date | string | null
  LastName?: string | null
  MiddleName?: string | null
  Role?: number | null
  Sex?: boolean | null
  Username?: string | null
  country?: countryUpdateOneWithoutUserInput | null
  identity?: identityUpdateOneRequiredWithoutUserInput | null
  userrestaurantrecord?: userrestaurantrecordUpdateManyWithoutUserInput | null
}

export type userUpdateManyMutationInput = {
  Adress?: string | null
  ArchivedAt?: Date | string | null
  Avatar?: string | null
  BornOn?: Date | string | null
  Created?: Date | string | null
  FirstName?: string | null
  Id?: number | null
  LastModified?: Date | string | null
  LastName?: string | null
  MiddleName?: string | null
  Role?: number | null
  Sex?: boolean | null
  Username?: string | null
}

export type userrestaurantrecordCreateInput = {
  Comment?: string | null
  Created: Date | string
  DateVisited?: Date | string | null
  IsFavorite: boolean
  LastModified?: Date | string | null
  Status: number
  restaurant: restaurantCreateOneWithoutUserrestaurantrecordInput
  user: userCreateOneWithoutUserrestaurantrecordInput
}

export type userrestaurantrecordUpdateInput = {
  Comment?: string | null
  Created?: Date | string | null
  DateVisited?: Date | string | null
  Id?: number | null
  IsFavorite?: boolean | null
  LastModified?: Date | string | null
  Status?: number | null
  restaurant?: restaurantUpdateOneRequiredWithoutUserrestaurantrecordInput | null
  user?: userUpdateOneRequiredWithoutUserrestaurantrecordInput | null
}

export type userrestaurantrecordUpdateManyMutationInput = {
  Comment?: string | null
  Created?: Date | string | null
  DateVisited?: Date | string | null
  Id?: number | null
  IsFavorite?: boolean | null
  LastModified?: Date | string | null
  Status?: number | null
}

export type IntFilter = {
  equals?: number | null
  not?: number | IntFilter | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number | null
  lte?: number | null
  gt?: number | null
  gte?: number | null
}

export type DateTimeFilter = {
  equals?: Date | string | null
  not?: Date | string | DateTimeFilter | null
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
}

export type StringFilter = {
  equals?: string | null
  not?: string | StringFilter | null
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type restaurantFilter = {
  every?: restaurantWhereInput | null
  some?: restaurantWhereInput | null
  none?: restaurantWhereInput | null
}

export type restaurantsubcategoryFilter = {
  every?: restaurantsubcategoryWhereInput | null
  some?: restaurantsubcategoryWhereInput | null
  none?: restaurantsubcategoryWhereInput | null
}

export type NullableDateTimeFilter = {
  equals?: Date | string | null
  not?: Date | string | null | NullableDateTimeFilter
  in?: Enumerable<Date | string> | null
  notIn?: Enumerable<Date | string> | null
  lt?: Date | string | null
  lte?: Date | string | null
  gt?: Date | string | null
  gte?: Date | string | null
}

export type BooleanFilter = {
  equals?: boolean | null
  not?: boolean | BooleanFilter | null
}

export type NullableStringFilter = {
  equals?: string | null
  not?: string | null | NullableStringFilter
  in?: Enumerable<string> | null
  notIn?: Enumerable<string> | null
  lt?: string | null
  lte?: string | null
  gt?: string | null
  gte?: string | null
  contains?: string | null
  startsWith?: string | null
  endsWith?: string | null
}

export type userFilter = {
  every?: userWhereInput | null
  some?: userWhereInput | null
  none?: userWhereInput | null
}

export type userrestaurantrecordFilter = {
  every?: userrestaurantrecordWhereInput | null
  some?: userrestaurantrecordWhereInput | null
  none?: userrestaurantrecordWhereInput | null
}

export type countryOrderByInput = {
  id?: OrderByArg | null
  name?: OrderByArg | null
}

export type restaurantOrderByInput = {
  Adress?: OrderByArg | null
  CategoryId?: OrderByArg | null
  CountryId?: OrderByArg | null
  Created?: OrderByArg | null
  Id?: OrderByArg | null
  Image?: OrderByArg | null
  LastModified?: OrderByArg | null
  Name?: OrderByArg | null
  SubcategoryId?: OrderByArg | null
}

export type restaurantsubcategoryOrderByInput = {
  CategoryId?: OrderByArg | null
  Created?: OrderByArg | null
  Id?: OrderByArg | null
  LastModified?: OrderByArg | null
  Name?: OrderByArg | null
}

export type userrestaurantrecordOrderByInput = {
  Comment?: OrderByArg | null
  Created?: OrderByArg | null
  DateVisited?: OrderByArg | null
  Id?: OrderByArg | null
  IsFavorite?: OrderByArg | null
  LastModified?: OrderByArg | null
  RestaurantId?: OrderByArg | null
  Status?: OrderByArg | null
  UserId?: OrderByArg | null
}

export type userOrderByInput = {
  Adress?: OrderByArg | null
  ArchivedAt?: OrderByArg | null
  Avatar?: OrderByArg | null
  BornOn?: OrderByArg | null
  CountryId?: OrderByArg | null
  Created?: OrderByArg | null
  FirstName?: OrderByArg | null
  Id?: OrderByArg | null
  IdentityId?: OrderByArg | null
  LastModified?: OrderByArg | null
  LastName?: OrderByArg | null
  MiddleName?: OrderByArg | null
  Role?: OrderByArg | null
  Sex?: OrderByArg | null
  Username?: OrderByArg | null
}

export type identityOrderByInput = {
  ArchivedAt?: OrderByArg | null
  ConfirmedAt?: OrderByArg | null
  Created?: OrderByArg | null
  Email?: OrderByArg | null
  Id?: OrderByArg | null
  IsConfirmed?: OrderByArg | null
  LastModified?: OrderByArg | null
  Password?: OrderByArg | null
  RefreshToken?: OrderByArg | null
  Username?: OrderByArg | null
}

export type restaurantcategoryOrderByInput = {
  Created?: OrderByArg | null
  Id?: OrderByArg | null
  LastModified?: OrderByArg | null
  Name?: OrderByArg | null
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};
