/* Third-party modules */
import { defineRelations } from "drizzle-orm";

import * as schemas from "./schemas";

export const relations = defineRelations(schemas, (relation) => ({
  user: {
    sessions: relation.many.session(),
    account: relation.many.account(),
  },
  session: {
    user: relation.one.user({
      from: relation.session.userId,
      to: relation.user.id,
    }),
  },
  account: {
    user: relation.one.user({
      from: relation.account.userId,
      to: relation.user.id,
    }),
  },
}));
