import { Formik, Form, Field } from 'formik';
import { useSelector } from 'react-redux';
import { getSearchSelector } from '../../../redux/selectors';
import styles from './Users.module.css'

type propsType = {
    onPageChanged: (pageNumber: number, search: string) => void
}

const SearchForm: React.FC<propsType> = (props) => {

    const search = useSelector(getSearchSelector)

    return (
        <div className={styles.searchWrapper}>
            <Formik
                initialValues={{search: search}}
                onSubmit={(values, { setSubmitting }) => {
                    props.onPageChanged(1, values.search)
                    setSubmitting(false);
                }}
                >
                {({ isSubmitting }) => (
                    <Form className={styles.searchForm}>
                        <Field placeholder="Поиск..." className={styles.searchInput} type="text" name="search" />
                        <button className={styles.searchBtn} type="submit" disabled={isSubmitting}>
                            Искать
                        </button>
                    </Form>
                )}
            </Formik>
        </div>    
    )
}

export default SearchForm