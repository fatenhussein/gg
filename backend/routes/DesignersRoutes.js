import express from 'express';
import Designer from '../models/designersModel.js';
import expressAsyncHandler from 'express-async-handler';
import { isAuth, isAdmin } from '../utils.js';


//Create an instance of the Express router 
const DesignersRouter = express.Router();


//retrieves all designers from the database 
DesignersRouter.get('/', async (req, res) => {
  const designers = await Designer.find();
  res.send(designers);
});


//creates a new designer in the database + Authentication + cheacks  admin privileges
DesignersRouter.post(
  '/',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const newDesigner = new Designer({
      name: 'sample name ' + Date.now(),
      slug: 'sample-name-' + Date.now(),
      image: '/images/p1.jpg',
      category: 'sample category',
      rating: 0,
      description: 'sample description',
    });
    const designer = await newDesigner.save();
    res.send({ message: 'Designer Created', designer });
  })
);

//This handler updates a designer by its ID in the database + Authentication + cheacks  admin privileges
DesignersRouter.put(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const designerId = req.params.id;
    const designer = await Designer.findById(designerId);
    if (designer) {
      designer.name = req.body.name;
      designer.slug = req.body.slug;
      designer.image = req.body.image;
      designer.category = req.body.category;
      designer.description = req.body.description;
      await designer.save();
      res.send({ message: 'Designer Updated' });
    } else {
      res.status(404).send({ message: 'Designer Not Found' });
    }
  })
);

// deletes a designer from the database  + Authentication + cheacks  admin privileges
DesignersRouter.delete(
  '/:id',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const designer = await Designer.findById(req.params.id);
    if (designer) {
      await designer.deleteOne();
      res.send({ message: 'designer Deleted' });
    } else {
      res.status(404).send({ message: 'designer Not Found' });
    }
  })
);

//PAGE_SIZE to determine the number of designers to fetch per page
const PAGE_SIZE = 3;



//handler retrieves designers for the admin panel + pagination + Authentication + cheacks  admin privileges
DesignersRouter.get(
  '/admin',
  isAuth,
  isAdmin,
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const page = query.page || 1;
    const pageSize = query.pageSize || PAGE_SIZE;

    const designers = await Designer.find()
      .skip(pageSize * (page - 1))
      .limit(pageSize);
    const countDesigners = await Designer.countDocuments();
    res.send({
      designers,
      countDesigners,
      page,
      pages: Math.ceil(countDesigners / pageSize),
    });
  })
);
//searching for designers based on various query parameters + pagination
DesignersRouter.get(
  '/search',
  expressAsyncHandler(async (req, res) => {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || '';

    const rating = query.rating || '';
    const order = query.order || '';
    const searchQuery = query.query || '';

    const queryFilter =
      searchQuery && searchQuery !== 'all'
        ? {
            name: {
              $regex: searchQuery,
              $options: 'i',
            },
          }
        : {};
    const categoryFilter = category && category !== 'all' ? { category } : {};
    const ratingFilter =
      rating && rating !== 'all'
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};

    const sortOrder =
      order === 'featured'
        ? { featured: -1 }
        : order === 'toprated'
        ? { rating: -1 }
        : order === 'newest'
        ? { createdAt: -1 }
        : { _id: -1 };

    const designers = await Designer.find({
      ...queryFilter,
      ...categoryFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countDesigners = await Designer.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...ratingFilter,
    });
    res.send({
      designers,
      countDesigners,
      page,
      pages: Math.ceil(countDesigners / pageSize),
    });
  })
);

//retrieves all distinct designer categories from the database
DesignersRouter.get(
  '/categories',
  expressAsyncHandler(async (req, res) => {
    const categories = await Designer.find().distinct('category');
    res.send(categories);
  })
);
//retrieves a designer by its slug from the database 
DesignersRouter.get('/slug/:slug', async (req, res) => {
  const designer = await Designer.findOne({ slug: req.params.slug });
  if (designer) {
    res.send(designer);
  } else {
    res.status(404).send({ message: 'Designers Not Found' });
  }
});
//etrieves a designer by its ID from the database
DesignersRouter.get('/:id', async (req, res) => {
  const designer = await Designer.findById(req.params.id);
  if (designer) {
    res.send(designer);
  } else {
    res.status(404).send({ message: 'Designers Not Found' });
  }
});
export default DesignersRouter;
