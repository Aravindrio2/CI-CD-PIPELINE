# Use nginx base image
FROM nginx:alpine

# Copy website files to nginx html directory
COPY "CI CD PIPELINE"/ /usr/share/nginx/html/


# Expose port
EXPOSE 80
