// import type { Request, Response, NextFunction } from "express";
// import { ZodError, type ZodTypeAny } from "zod";

// export const validate =
//   (schema: ZodTypeAny) =>
//   async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//     try {
//       const parsed = (await schema.parseAsync({
//         body: req.body,
//         query: req.query,
//         params: req.params,
//       })) as {
//         body?: unknown;
//         query?: unknown;
//         params?: unknown;
//       };

//       if (parsed.body !== undefined) (req as any).body = parsed.body;
//       if (parsed.params !== undefined) (req as any).params = parsed.params;
//       // Note: req.query is read-only in Express, so we don't reassign it

//       next();
//     } catch (error) {
//       if (error instanceof ZodError) {
//         res.status(400).json({
//           success: false,
//           message: "Validation failed",
//           errors: error.issues.map((err) => ({
//             field: err.path.join("."),
//             message: err.message,
//           })),
//         });
//         return;
//       }

//       next(error);
//     }
//   };
