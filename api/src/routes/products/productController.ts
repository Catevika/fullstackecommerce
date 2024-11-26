import { eq } from 'drizzle-orm';
import type { Request, Response } from 'express';
import { db } from '../../db';
import { productTable } from '../../db/productSchema';
export async function listProducts(req: Request, res: Response) {
  try {
    const [products] = await db.select().from(productTable);
    res.json(products);
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function getProductById(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [product] = await db.select().from(productTable).where(eq(productTable.id, id));

    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }

    res.json(product);

  } catch (error) {
    res.status(500).send(error);
  }
}
export async function createProduct(req: Request, res: Response) {
  try {
    const [product] = await db.insert(productTable).values(req.body).returning();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function updateProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const updatedFields = req.body;
    const [updatedProduct] = await db.update(productTable).set(updatedFields).where(eq(productTable.id, id)).returning();
    if (updatedProduct) {
      return res.status(200).json(updatedProduct);
    }
    res.status(404).send({ message: 'Product not found' });
  } catch (error) {
    res.status(500).send(error);
  }
}
export async function deleteProduct(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const [deletedProduct] = await db.delete(productTable).where(eq(productTable.id, id)).returning();

    if (deletedProduct) {
      return res.status(204).send();
    }
    res.status(404).send({ message: 'Product not found' });
  } catch (error) {
    res.status(500).send(error);
  }
}