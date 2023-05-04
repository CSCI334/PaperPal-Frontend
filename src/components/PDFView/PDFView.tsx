import React, { useState } from "react";
import {Button, Grid, Container, Typography, Box} from '@mui/material';
import { Document, Page, pdfjs } from "react-pdf";
import 'react-pdf/dist/esm/Page/TextLayer.css';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Set workerSrc to load PDF files
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

//Ensures file is always of type string
interface PDFViewerProps {
    file: string;
}
//This class deals with the actual rendering of PDFView and anything else it needs to render
// TODO:: Update this to take a paperID and request from backend once that is available
const PDFView: React.FC<PDFViewerProps> = ({ file }) => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    // TODO:: all these from request
    const fileName = '';
    const aName = "Lorem Ipsum";
    const sDate = new Date();

    //Function to set the number of pages upon a successful PDF load
    function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
        setNumPages(numPages);

    }
    const nextPage = () => {
        if (pageNumber < (numPages || 0)) setPageNumber(pageNumber + 1);
    };

    const prevPage = () => {
        if (pageNumber > 1) setPageNumber(pageNumber - 1);
    };

    //Renders the pdf
    return (
        <Container>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <p style={{ marginRight: '10px' }}>Author: {aName}</p>
                <p>Submitted on: {sDate.toLocaleDateString()}</p>
            </div>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    background: "#f2f2f2",
                    minHeight: "100%",
                    py: 4,
                    flexGrow: 1
            }}>
                <Box flexGrow={1} sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: 2 }} tabIndex={-1}>
                    <Document file={file}
                              renderMode="canvas"
                              onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page
                            pageNumber={pageNumber}
                            scale={1.7}
                        />
                    </Document>
                </Box>
                {numPages && (
                    <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 0 }}>
                        <Grid item>
                            <Button
                                sx={{
                                    backgroundColor: "#72BAD1",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.075)",
                                    borderRadius: "20px",
                                    width: "150px",
                                    color: "white"
                                }}
                                onClick={prevPage} disabled={pageNumber === 1}
                            >
                                Previous
                            </Button>
                        </Grid>
                        <Grid item>
                            <Typography>
                                Page {pageNumber} of {numPages}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Button
                                sx={{
                                    backgroundColor: "#72BAD1",
                                    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.075)",
                                    borderRadius: "20px",
                                    width: "150px",
                                    color: "white"
                                }}
                                onClick={nextPage} disabled={pageNumber === numPages}
                            >
                                Next
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default PDFView;

