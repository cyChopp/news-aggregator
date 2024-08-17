# News aggregator

This project is a News Aggregator application built with React, Vite, and Docker.

## Technology Stack

- **React**
- **Vite**
- **Docker**
- **typescript**
- **shadcn-ui**
- **tailwind**
- **axios**
- **zod**
- **date-fns**

[Figma link](https://www.figma.com/design/9lHxMZEyAZUjvFlUuEh549/Untitled)

## Getting Started

To run the application within a Docker container, follow these steps:

### 1. Build the Docker Image

Ensure Docker is running on your machine, then open your terminal and execute the following command:

```bash
docker build -t aggregator .
```

This will create a Docker image for the application.

### 2. Run the Docker Container

After the image has been created, you can start a container using the image. Replace <image_id> with the actual image ID from the list of Docker images, which you can find using the command `docker images` or directly in the Docker app.

```bash
docker run -p 5173:5173 <image_id>
```

### 3. Access the Application

Once the container is running, open your browser and go to [http://localhost:5173/](http://localhost:5173/) to access the application.

&nbsp;
&nbsp;
&nbsp;

# Challenge Description

```text
The challenge is to create the user interface for a news aggregator website that pulls articles from various sources and displays them in a clean, easy-to-read format.

Requirements

1. Article search and filtering: Users should be able to search for articles by keyword and filter the results by date, category, and source.
2. Personalized news feed: Users should be able to customize their news feed by selecting their preferred sources, categories, and authors.
3. Mobile-responsive design: The website should be optimized for viewing on mobile devices.

Data Sources

Choose at least 3 of the following data sources:

1. NewsAPI: A comprehensive API that allows developers to access articles from more than 70,000 news sources, including major newspapers, magazines, and blogs. The API provides access to articles in various languages and categories, and it supports search and filtering.
2. OpenNews: This API provides access to a wide range of news content from various sources, including newspapers, magazines, and blogs. It allows developers to retrieve articles based on keywords, categories, and sources.
3. NewsCred: The NewsCred API provides access to a wide range of news content from various sources, including newspapers, magazines, and blogs. The API allows developers to retrieve articles based on keywords, categories, and sources, as well as to search for articles by author, publication, and topic.
4. The Guardian**: This API allows developers to access articles from The Guardian newspaper, one of the most respected news sources in the world. The API provides access to articles in various categories and supports search and filtering.
5. New York Times**: This API allows developers to access articles from The New York Times, one of the most respected news sources in the world. The API provides access to articles in various categories and supports search and filtering.
6. BBC News: This API allows developers to access news from BBC News, one of the most trusted news sources in the world. It provides access to articles in various categories and supports search and filtering.
7. NewsAPI.org**: This API provides access to news articles from thousands of sources, including news publications, blogs, and magazines. It allows developers to retrieve articles based on keywords, categories, and sources.

Challenge Guidelines

1. The output expected from this challenge is a front-end project using React.js.
2. You are free to choose at least three data sources from the provided list to fetch articles for your news aggregator.
3. Ensure that the Frontend application can be containerized using Docker and provide clear documentation on how to run the project within a Docker container.
4. Incorporate best practices of software development such as DRY (Don't Repeat Yourself), KISS (Keep It Simple, Stupid), and SOLID (Single responsibility, Open-closed, Liskov substitution, Interface segregation, Dependency inversion) into your code.
```
