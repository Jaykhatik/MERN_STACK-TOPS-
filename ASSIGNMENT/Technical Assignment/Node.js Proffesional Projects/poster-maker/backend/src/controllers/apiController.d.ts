import { Request, Response } from 'express';
export declare const getTemplates: (req: Request, res: Response) => void;
export declare const createDesign: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const getDesigns: (req: Request, res: Response) => void;
export declare const deleteDesign: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const uploadImage: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
export declare const setBackground: (req: Request, res: Response) => Response<any, Record<string, any>> | undefined;
//# sourceMappingURL=apiController.d.ts.map