module.exports = [
    {test: "column count matches x resolution",
    result: (test, renderer) => {
        return (renderer.screen.columnCount === test.resolutionX)
    }},
    {test: "row count matches y resolution",
    result: (test, renderer) => {
        return (renderer.screen.rowCount === test.resolutionY)
    }},
    {test: "columnPixels length matches x resolution",
    result: (test, renderer) => {
        return (renderer.screen.columnPixels.length === test.resolutionX)
    }},        
    {test: "rowPixels length matches y resolution",
    result: (test, renderer) => {
        return (renderer.screen.rowPixels.length === test.resolutionY)
    }},
    {test: "rows length matches y resolution",
    result: (test, renderer) => {
        return (renderer.screen.rows.length === test.resolutionY)
    }},    
]