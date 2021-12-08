import * as React from 'react';
import { useState } from 'react';
import classNames from 'classnames';
import Markdown from 'markdown-to-jsx';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import { getDataAttrs } from '../../../utils/get-data-attrs';
import Action from '../../atoms/Action';

export default function JobsSection(props) {
    const cssId = props.elementId || null;
    const customClass = props.customClass || null;
    const colors = props.colors || 'colors-a';
    const styles = props.styles || {};
    const sectionWidth = mapMaxWidthStyles(styles.self?.width || 'wide');
    const sectionHeight = mapMinHeightStyles(styles.self?.height || 'auto');
    const sectionJustifyContent = mapStyles({ justifyContent: styles.self?.justifyContent || 'center' });
    const jobCategories = props.categories || [];
    return (
        <div
            id={cssId}
            {...getDataAttrs(props)}
            className={classNames(
                'sb-component',
                'sb-component-section',
                'sb-component-jobs-section',
                customClass,
                colors,
                'flex',
                'flex-col',
                'justify-center',
                sectionHeight,
                styles.self?.margin,
                styles.self?.padding || 'py-12 px-4',
                styles.self?.borderColor,
                styles.self?.borderRadius ? mapStyles({ borderRadius: styles.self?.borderRadius }) : null,
                styles.self?.borderStyle ? mapStyles({ borderStyle: styles.self?.borderStyle }) : 'border-none'
            )}
            style={{
                borderWidth: styles.self?.borderWidth ? `${styles.self?.borderWidth}px` : null
            }}
        >
            <div className={classNames('flex', 'w-full', sectionJustifyContent)}>
                <div className={classNames('w-full', sectionWidth)}>
                    {props.title && (
                        <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)} data-sb-field-path=".title">
                            {props.title}
                        </h2>
                    )}
                    {props.subtitle && (
                        <p
                            className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, {
                                'mt-6': props.title
                            })}
                            data-sb-field-path=".subtitle"
                        >
                            {props.subtitle}
                        </p>
                    )}
                    {jobCategories.length > 0 && (
                        <div className={classNames('space-y-16 lg:space-y-24', { 'mt-12 lg:mt-16': props.title || props.subtitle })} data-sb-field-path=".jobCategories">
                            {jobCategories.map((jobCategory, index) => (
                                <JobCategory key={index} {...jobCategory} data-sb-field-path={`.${index}`} />
                                ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

function JobCategory(props) {
    const jobItems = props.items || [];
    return (
        <div className="border-b border-current pb-12 lg:pb-20" data-sb-field-path={props['data-sb-field-path']}>
            {props.title && (
                <h3 className="mb-10" data-sb-field-path=".title">{props.title}</h3>
            )}
            {jobItems.length > 0 && (
                <div className="space-y-16 lg:space-y-24" data-sb-field-path=".items">
                    {jobItems.map((jobItem, index) => (
                        <JobItem key={index} {...jobItem} data-sb-field-path={`.${index}`} />
                    ))}
                </div>
            )}
        </div>
    );
}

function JobItem(props) {
    const actions = props.actions || [];
    return (
        <div className="max-w-screen-sm" data-sb-field-path={props['data-sb-field-path']}>
            {props.title && (
                <h4 className="text-xl font-normal" data-sb-field-path=".title">{props.title}</h4>
            )}
            {props.location && (
                <p
                    className={classNames('text-xl', 'font-bold', { 'mt-4': props.title })}
                    data-sb-field-path=".location"
                >
                    {props.location}
                </p>
            )}
            {props.text && (
                <Markdown
                    options={{ forceBlock: true, forceWrapper: true }}
                    className={classNames('sb-markdown', {
                        'mt-10 lg:mt-12': props.title || props.location
                    })}
                    data-sb-field-path=".text"
                >
                    {props.text}
                </Markdown>
            )}
            {actions.length > 0 && (
                <div className={classNames('overflow-x-hidden', { 'mt-10 lg:mt-12': props.title || props.location || props.text })}>
                    <div className="flex flex-wrap items-center -mx-2" data-sb-field-path=".actions">
                        {actions.map((action, index) => (
                            <Action key={index} {...action} className="mb-3 mx-2 lg:whitespace-nowrap" data-sb-field-path={`.${index}`} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

function mapMinHeightStyles(height) {
    switch (height) {
        case 'screen':
            return 'min-h-screen';
    }
    return null;
}

function mapMaxWidthStyles(width) {
    switch (width) {
        case 'narrow':
            return 'max-w-screen-md';
        case 'wide':
            return 'max-w-screen-xl';
        case 'full':
            return 'max-w-full';
    }
    return null;
}
